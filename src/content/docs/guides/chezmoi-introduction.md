---
title: chezmoi 入門 ― dotfiles を安全に管理・反映する考え方
description: dotfiles 管理ツール chezmoi の全体像と、実ファイル・source state・target state の3状態モデルを整理する。変更・削除・remote反映でつまずきやすいポイントを実運用の知見から解説する。
date: 2026-07-05
status: evergreen
tags:
  - chezmoi
  - dotfiles
  - git
  - cli
  - workflow
  - configuration
author: ai
provenance:
  source_type: ai_session
  source_ref:
    - "実運用メモ: chezmoi の変更・削除・remote反映の考え方"
    - "chezmoi 公式ドキュメント (chezmoi.io)"
  captured_at: 2026-07-05
  ai_process:
    - synthesize
    - structure
  confidence: high
  review_needed: false
knowledge_status:
  claim_status: active
  contradiction_review: none
---

[chezmoi](https://www.chezmoi.io/) は、複数マシンにまたがる dotfiles（`.zshrc` や各種設定ファイル）を Git で管理するためのツールです。
この文書の目的は、**chezmoi の全体像を掴んだうえで、変更・削除・remote反映でつまずかないための考え方を整理すること**です。

前半で chezmoi とは何か・3つの状態モデルを説明し、後半で実運用のハマりどころ（`re-add` で取り込めないケース、`DA` の罠、`forget` の使いどころ）を扱います。

## chezmoi とは

chezmoi は、`~/.zshrc` のような設定ファイル群を **1つの Git リポジトリにまとめて管理し、複数のマシンへ再現する**ためのツールです。

似た目的のツールとして「ホームディレクトリにシンボリックリンクを張る」方式（GNU Stow など）がありますが、chezmoi はリンクを張るのではなく、**source（本体）から実ファイルを生成する**という考え方を取ります。この違いが、後述する3状態モデルの理解に直結します。

### なぜ使うか

* **複数マシンで同じ環境を再現できる** ― 新しいマシンで `chezmoi init` するだけで dotfiles が揃う
* **Git で履歴を残せる** ― 設定変更を commit / push でき、いつ・何を変えたか追える
* **マシンごとの差分を扱える** ― template 機能で「会社用と個人用で値を変える」といった分岐を1つのソースから生成できる
* **シークレットを平文で置かずに済む** ― パスワードマネージャや暗号化と連携し、機密値をリポジトリに直接書かなくてよい

一方で、chezmoi は**ホームディレクトリを直接同期するツールではありません**。ここが最初に混乱しやすい点です。次章の状態モデルが、その理由を説明します。

## いちばん大事な考え方：3つの状態モデル

chezmoi を使うときに混乱しやすいのは、次の3つの状態があることです。

1. **実ファイル**
   * 例：`~/.codex/config.toml`
   * 普段自分が編集しているホームディレクトリ上のファイル

2. **chezmoi の source state**
   * 例：`~/.local/share/chezmoi/dot_codex/config.toml`
   * Git 管理されている dotfiles の本体

3. **chezmoi が生成しようとしている target state**
   * source state から `chezmoi apply` したときに、ホームディレクトリへ反映される内容

つまり、`~/.codex/config.toml` を直接編集しただけでは、**まだ chezmoi の管理リポジトリには反映されていません**。

この3状態の間には、はっきりした「方向」があります。これを意識すると、どのコマンドを使うべきかが見えてきます。

```text
実ファイルの変更を source に取り込む  → add / re-add / forget
source の内容を実ファイルに反映する    → apply
source repo を remote に送る          → git commit / push
```

remote に反映するには、基本的に次の2段階が必要です。

```bash
# 1. 実ファイルの変更を chezmoi source に取り込む
chezmoi re-add ~/.codex/config.toml

# 2. chezmoi source repo を git commit / push する
chezmoi cd
git status
git add .
git commit -m "Update dotfiles"
git push
```

`chezmoi cd` の代わりに、`chezmoi git -- ...` でリポジトリを直接操作することもできます。

```bash
chezmoi git -- status
chezmoi git -- add .
chezmoi git -- commit -m "Update dotfiles"
chezmoi git -- push
```

## 導入

まだ chezmoi を使っていない場合の最初の一歩です。インストール後、`init` でリポジトリを作り、管理したいファイルを `add` します。

```bash
# インストール（macOS / Homebrew の例）
brew install chezmoi

# source リポジトリを初期化する
chezmoi init

# 最初のファイルを管理対象に加える
chezmoi add ~/.zshrc
```

`chezmoi add` すると、実ファイルが source state（`~/.local/share/chezmoi/`）にコピーされます。あとは `chezmoi cd` でそのリポジトリに入り、GitHub などの remote に push しておけば、別マシンから `chezmoi init <repo>` で同じ環境を再現できます。

## よく使うコマンド

### 現在の差分を見る

```bash
chezmoi status
chezmoi diff
```

`status` はざっくり全体像を見るため、`diff` は実際の変更内容を見るために使います。ファイルを指定して確認することもできます。

```bash
chezmoi diff ~/.codex/config.toml
```

### 既存ファイルの変更を取り込む（re-add）

すでに chezmoi 管理されているファイルを、ホームディレクトリ側で編集した場合は `re-add` を使います。

```bash
chezmoi re-add ~/.codex/config.toml
```

全体をまとめて取り込みたい場合は次のようにします。

```bash
chezmoi re-add
```

ただし `re-add` は万能ではありません。特に次のケースでは注意が必要です（詳しくは後述）。

* template 管理されているファイル
* 削除したファイル
* ディレクトリごと消したもの
* chezmoi 管理外の新規ファイル

### 新しいファイルを管理対象にする（add）

新しく作ったファイルを chezmoi 管理に入れる場合は `add` です。

```bash
chezmoi add ~/.codex/new-config.toml
```

**既存の管理対象ファイルを更新するなら `re-add`、新規ファイルを管理対象にするなら `add`** と覚えます。

### 管理対象から外す（forget）

ファイルをホームディレクトリから消しただけでは、chezmoi の source state にはまだ残っています。
その状態で `chezmoi apply` すると、**消したはずのファイルが復活します**。

管理対象から外したい場合は `forget` を使います。

```bash
chezmoi forget ~/.claude/notify.sh
```

ディレクトリごと外す場合も同様です。

```bash
chezmoi forget ~/.claude/plugins/marketplaces/cctop
```

## `chezmoi status` の読み方

`chezmoi status` では、各行の先頭に2文字の状態が表示されます。

```text
MM .codex/config.toml
DA .claude/notify.sh
```

この2文字は、ざっくり次のように読みます。

```text
1文字目 = 前回 chezmoi が書いた状態と、現在の実ファイルの差分
2文字目 = 現在の実ファイルと、chezmoi が作ろうとしている状態の差分
```

よく見るパターンは以下です。

```text
MM = 実ファイルも source 側も変更がある
DA = 実ファイルでは削除されているが、chezmoi apply すると追加される
```

特に **`DA` は重要**です。
これは「ホームディレクトリでは削除されているが、chezmoi の source state にはまだ残っている」状態を意味します。

つまり、単にファイルを消しただけでは chezmoi 管理から外れていません。この状態で `chezmoi apply` すると、ファイルが復活します。削除を正式に取り込みたい場合は、`re-add` ではなく `forget` を使います。

## remote に反映する基本フロー

3状態モデルを踏まえると、remote 反映は「取り込む → commit → push」という同じ形に収まります。取り込み方だけが操作によって変わります。

### 既存ファイルを編集した場合

```bash
chezmoi diff ~/.codex/config.toml
chezmoi re-add ~/.codex/config.toml

chezmoi git -- status
chezmoi git -- diff
chezmoi git -- add .
chezmoi git -- commit -m "Update codex config"
chezmoi git -- push
```

### 新規ファイルを追加した場合

```bash
chezmoi add ~/.new-config-file

chezmoi git -- status
chezmoi git -- diff
chezmoi git -- add .
chezmoi git -- commit -m "Add new config file"
chezmoi git -- push
```

### ファイルやディレクトリを削除した場合

```bash
chezmoi forget ~/.claude/notify.sh
chezmoi forget ~/.claude/plugins/marketplaces/cctop

chezmoi git -- status
chezmoi git -- diff
chezmoi git -- add .
chezmoi git -- commit -m "Remove unused claude files"
chezmoi git -- push
```

## `re-add` で取り込めないケース

ここからは実運用でつまずきやすいポイントです。`re-add` したのに差分が期待通りにならないときは、たいてい次の3つのどれかです。

### ケース1：template 管理されている

まず、対象ファイルが template かどうかを確認します。

```bash
chezmoi source-path ~/.codex/config.toml
```

出力が `.tmpl` で終わる場合、そのファイルは template 管理されています。

```text
/Users/masumi/.local/share/chezmoi/dot_codex/config.toml.tmpl
```

template 管理されている場合、`re-add` では期待通りに取り込めないことがあります。実ファイルの変更が template の生成ロジックと食い違うためです。この場合は source 側を直接編集します。

```bash
chezmoi edit ~/.codex/config.toml
```

または次のようにします。

```bash
vim "$(chezmoi source-path ~/.codex/config.toml)"
```

食い違いは、次の3つを見比べると切り分けられます。

```bash
# 実ファイル
grep -n "notify" ~/.codex/config.toml

# chezmoi が生成しようとしている内容
chezmoi cat ~/.codex/config.toml | grep notify

# source/template 側
grep -n "notify" "$(chezmoi source-path ~/.codex/config.toml)"
```

`~/.codex/config.toml` は直っているのに `chezmoi cat ~/.codex/config.toml` が古いままなら、source/template 側がまだ直っていない、ということです。

### ケース2：ファイルを削除した

削除は `re-add` ではなく `forget` です。

```bash
chezmoi forget ~/.claude/notify.sh
```

ディレクトリごと削除したい場合も同様です。

```bash
chezmoi forget ~/.claude/plugins/marketplaces/cctop
```

その後、source repo 側で削除差分が出ていることを確認します。

```bash
chezmoi git -- status
chezmoi git -- diff
```

### ケース3：chezmoi 管理外の新規ファイル

新規ファイルは `re-add` ではなく `add` です。

```bash
chezmoi add ~/.some-new-file
```

## `apply` はいつ使うか

`chezmoi apply` は、source state の内容をホームディレクトリへ反映するコマンドです。方向はこうなります。

```text
chezmoi source state → home directory
```

したがって、ホームディレクトリ側で消したファイルを source 側からも消したい場合に、**いきなり `apply` してはいけません**。`DA` が大量に出ている状態で `apply` すると、消したファイルが復活する可能性があります。

この場合は先に `forget` します。

```bash
chezmoi forget ~/.claude/plugins/marketplaces/cctop
```

そのうえで、必要なら `apply` します。

## 迷ったときの確認コマンド

```bash
# このファイルは chezmoi でどこに対応しているか
chezmoi source-path ~/.codex/config.toml

# chezmoi が生成する予定の内容を見る
chezmoi cat ~/.codex/config.toml

# 実ファイルと chezmoi 管理内容の差分を見る
chezmoi diff ~/.codex/config.toml

# source repo の状態を見る
chezmoi git -- status
```

## 判断表

| やりたいこと | 使うコマンド |
| --- | --- |
| 既存の管理対象ファイルの編集を取り込む | `chezmoi re-add <file>` |
| 新しいファイルを管理対象にする | `chezmoi add <file>` |
| ファイルを管理対象から外す | `chezmoi forget <file>` |
| template 管理ファイルを編集する | `chezmoi edit <file>` |
| source の内容をホームディレクトリに反映する | `chezmoi apply` |
| 差分を見る | `chezmoi diff` |
| 状態を見る | `chezmoi status` |
| remote に反映する | `chezmoi git -- commit` / `chezmoi git -- push` |

## まとめ

chezmoi でつまずいたときは、たいてい「どの状態を触っているのか」が曖昧になっています。次の3方向を分けて考えると、挙動はかなり理解しやすくなります。

* **実ファイルの変更を source に取り込む** → `add` / `re-add` / `forget`
* **source の内容を実ファイルに反映する** → `apply`
* **source repo を remote に送る** → `git commit` / `git push`

特に覚えておきたい実運用の要点は以下です。

* 実ファイルを編集しただけでは source には入らない ― `re-add` が要る
* ファイルを消しただけでは管理から外れない ― `forget` が要る（`re-add` では外れない）
* `DA` は「実ファイルは消えたが source に残っている」状態 ― この状態での `apply` は復活を招く
* template 管理ファイルは `re-add` ではなく `chezmoi edit`（または source 直接編集）で直す

## 参考

- [chezmoi 公式ドキュメント](https://www.chezmoi.io/)
- [chezmoi user guide](https://www.chezmoi.io/user-guide/command-overview/)
