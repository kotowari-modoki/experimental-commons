---
title: Herdr 入門 ― AIエージェント時代の terminal multiplexer
description: 複数の AI coding agent を並行運用するための terminal multiplexer「Herdr」の全体像と、Session→Workspace→Tab→Pane→Agent の階層モデルを整理する。detach/stop/delete の違いや状態復元など、実運用でつまずきやすい点を解説する。
date: 2026-07-05
status: evergreen
tags:
  - herdr
  - terminal
  - multiplexer
  - ai-agents
  - claude-code
  - codex
  - workflow
  - cli
author: ai
provenance:
  source_type: ai_session
  source_ref:
    - "実運用メモ: Herdr の使い方まとめ（AIエージェント時代の terminal multiplexer 入門）"
    - "Herdr 公式ドキュメント (herdr.dev)"
  captured_at: 2026-07-05
  ai_process:
    - synthesize
    - structure
  confidence: medium
  review_needed: true
knowledge_status:
  claim_status: active
  contradiction_review: none
---

[Herdr](https://herdr.dev/) は、Claude Code・Codex・OpenCode・Hermes といった AI coding agent を**複数同時に動かす**ことを前提にした terminal multiplexer です。
この文書の目的は、**Herdr の全体像を掴んだうえで、階層モデル・agent 状態・detach/stop/delete の違いといった、実運用でつまずきやすい点を整理すること**です。

前半で Herdr とは何か・基本概念を説明し、後半で状態保存や integration など運用のハマりどころを扱います。

## Herdr とは

Herdr は、tmux や Zellij に近い terminal multiplexer です。ただし単に pane を分割・永続化するだけでなく、**複数の実ターミナル pane を維持しながら、各 agent が working / blocked / done / idle のどの状態かを一覧できる**ところが特徴です。公式サイトでも、Herdr は terminal emulator や browser dashboard ではなく、既存の terminal の中で動く agent-aware な multiplexer と説明されています。

具体的には、次のような用途に向いています。

* Claude Code と Codex を別々の pane で動かす
* 複数リポジトリ・複数 worktree の作業を並行する
* agent が止まっているのか、作業中なのか、完了したのかを一覧する
* terminal を閉じても作業を継続させ、あとで再接続する
* SSH 先や Mac mini 上で agent を動かし、別端末から attach する

「terminal を増やす道具」というより、**複数 agent を並列運用するための control room** と考えると使いどころが分かりやすいです。

## 基本概念：階層モデル

Herdr は、次の階層で理解すると分かりやすいです。これが Herdr を使ううえでの背骨になります。

```text
Session
  └─ Workspace
      └─ Tab
          └─ Pane
              └─ Agent / shell / server / test process
```

### Session

Session は、Herdr の永続的な実行単位です。単に `herdr` と実行すると default session に接続します。named session を使うと、仕事用・実験用・別案件用のように完全に分けられます。公式ドキュメントでは、named session は panes / sockets / persisted runtime state を分離したいときに使うものと説明されています。

```sh
herdr
herdr --session work
herdr session list
herdr session attach work
```

### Workspace

Workspace は、プロジェクト単位の入れ物です。1 repo・1 task・1 investigation ごとに Workspace を作ると整理しやすくなります。Workspace は tab と pane を持ち、内部の agent 状態が sidebar に集約されます。

```sh
herdr workspace list
herdr workspace create --cwd ~/project --label api
herdr workspace focus <workspace_id>
herdr workspace rename <workspace_id> <label>
herdr workspace close <workspace_id>
```

UI 上では “space” と見える場面もありますが、CLI や公式概念では基本的に `workspace` として扱うとよいです。

### Tab

Tab は Workspace 内の layout 単位です。たとえば `agents`・`logs`・`server`・`review` のように役割ごとに分けます。

```sh
herdr tab list
herdr tab create --label logs
herdr tab rename <tab_id> logs
herdr tab close <tab_id>
```

### Pane

Pane は実際の terminal です。shell・agent・server・test process などを動かします。Herdr は pane の出力を描画し、入力を process に送り、client を detach しても pane を保持します。

```sh
herdr pane list
herdr pane split --current --direction right
herdr pane split --current --direction down
herdr pane focus --direction right
herdr pane swap --direction left
herdr pane zoom --current --toggle
herdr pane close <pane_id>
```

### Agent

Agent は Herdr が認識している pane 内の process です。Claude Code・Codex・GitHub Copilot CLI・Cursor Agent CLI・Hermes Agent などは検出対象になっています。Herdr は agent の状態を `blocked`・`working`・`done`・`idle`・`unknown` として扱います。

```text
blocked: 入力、承認、判断待ち
working: 作業中
done:    完了したが、まだ見ていない
idle:    完了または待機中で、確認済み
unknown: 状態を確実に判定できない
```

複数 agent を走らせているとき、Herdr の価値はこの状態一覧に出ます。すべての terminal を人間が巡回するのではなく、sidebar を見て「どれが判断待ちか」「どれが完了したか」だけを確認できます。

## インストール

macOS / Linux なら公式 installer で入れられます。

```sh
curl -fsSL https://herdr.dev/install.sh | sh
```

Homebrew を使っているならこちらでもよいです。

```sh
brew install herdr
```

mise を使っているなら次のように入れられます。

```sh
mise use -g herdr
```

公式ドキュメントでは、stable binary は Linux / macOS 向け、Windows は preview-only beta と説明されています。

インストール後は確認します。

```sh
herdr --version
herdr
```

## 最初の使い方

プロジェクトディレクトリで起動します。

```sh
cd ~/path/to/project
herdr
```

session に workspace がない場合、Herdr は自動で workspace を作ります。Workspace は project-level container なので、active project ごとに分けるのが基本です。

Pane の中で agent を起動します。

```sh
claude
# or
codex
# or
hermes
# or
opencode
```

Herdr は対応 agent を自動検出し、sidebar に状態を表示します。

## 操作方法

### マウス操作

Herdr は mouse-native です。pane・tab・workspace・agent をクリックして focus できます。split border をドラッグして resize したり、右クリックメニューから pane split や tab 作成もできます。文字列は drag select で clipboard にコピーでき、`Ctrl+C` は不要です。

マウスを terminal 側に渡したい場合は、設定で mouse capture を無効化できます。

```toml
# ~/.config/herdr/config.toml

[ui]
mouse_capture = false
```

### キーボード操作

Herdr は tmux と同じく prefix mode を持っています。default prefix は `ctrl+b` です。`prefix+c` は「`ctrl+b` を押して離してから `c` を押す」という意味です。

最初に覚える操作はこれくらいで十分です。

```text
prefix+c              新しい tab
prefix+v              右に pane split
prefix+minus          下に pane split
prefix+h/j/k/l        pane 移動
prefix+shift+h/j/k/l  pane 入れ替え
prefix+w              workspace navigation
prefix+shift+n        新しい workspace
prefix+q              detach
prefix+?              keybinding help
prefix+[              copy mode
```

公式 quick start でも、`prefix+q` で detach、`prefix+v` で右分割、`prefix+minus` で下分割、`prefix+c` で新規 tab などが主要操作として紹介されています。

### prefix を変更する

tmux と衝突する場合や `ctrl+b` が押しにくい場合は、prefix を変えられます。設定ファイルはここです。

```sh
~/.config/herdr/config.toml
```

default config を出力してから編集すると安全です。

```sh
herdr --default-config > ~/.config/herdr/config.toml
```

たとえば prefix を `ctrl+space` にするなら、次のようにします。

```toml
[keys]
prefix = "ctrl+space"
```

設定を反映します。

```sh
herdr server reload-config
```

Herdr は `config.toml` を編集したあと、`herdr server reload-config` で多くの UI 設定を pane を再起動せずに反映できます。ただし startup-only な設定は restart が必要です。

### pane を入れ替える

pane の場所を入れ替えるには次を使います。

```text
prefix+shift+h  左の pane と入れ替え
prefix+shift+j  下の pane と入れ替え
prefix+shift+k  上の pane と入れ替え
prefix+shift+l  右の pane と入れ替え
```

CLI からなら次のようにします。

```sh
herdr pane swap --direction left
herdr pane swap --direction right
herdr pane swap --direction up
herdr pane swap --direction down
```

特定の pane 同士を指定することもできます。

```sh
herdr pane swap --source-pane <pane_id> --target-pane <pane_id>
```

## detach / stop / delete の違い

Herdr で混乱しやすいのが、detach・stop・delete の違いです。ここを取り違えると、作業中の agent を意図せず止めてしまいます。

### detach ― 画面から抜けるだけ

detach は「画面から抜けるだけ」です。server や pane 内の process は動き続けます。

```text
prefix+q
```

terminal window を閉じても、Herdr server と agent は動き続けます。あとで `herdr` を実行すれば再接続できます。

```sh
herdr
```

### stop ― session / server を止める

stop は session / server を止めます。pane 内の shell・server・test・agent なども止まります。

default session を止めるなら次のようにします。

```sh
herdr server stop
```

named session を止めるなら次のようにします。

```sh
herdr session stop work
```

default session を明示的に指定したい場合は、session name として `default` を使えます。

```sh
herdr session stop default
```

### delete ― 保存済み state も消す

delete は、保存済みの session state も削除します。

```sh
herdr session delete work
```

使い分けるとこうなります。

```text
detach: 作業は生かしたまま画面だけ抜ける
stop:   session/server を止める。実行中 process も止まる
delete: 保存済み session 状態も消す
```

## 状態保存と復元

Herdr の状態保存には、いくつかのレベルがあります。「何が戻って、何が戻らないか」を分けて理解するのが重要です。

### 1. detach なら process は生き続ける

`prefix+q` で detach するだけなら、Herdr server と agent は動き続けます。これは「復元」というより、単に server 側で process が生きている状態です。

### 2. server restart 後は構造だけ復元される

Herdr server が止まって再起動した場合、元の pane process は消えます。その代わり、Herdr は workspace・tab・pane・cwd・layout・focus といった「session shape」を復元します。

戻るのは次のような**構造**の情報です。

```text
workspace
tab
pane
cwd
layout
focus
```

戻らないのは次のような**実行中の中身**です。

```text
実行中の shell
起動中の dev server
実行中の test
任意の process
```

### 3. pane history は optional

pane の画面履歴を再起動後にも見たい場合は、experimental な pane history を有効化できます。

```toml
[experimental]
pane_history = true
```

ただし pane output には secret・token・prompt・command output が含まれる可能性があります。そのため公式ドキュメントでも pane history は default off です。有効にすると `session-history.json` が保存されるので、terminal history と同じ機密度で扱うべきです。

### 4. agent session restore

Claude Code や Codex など一部の agent は、自分自身の session resume 機能を持っています。Herdr は official integration が報告した session reference を使い、server restart 後に agent pane を再開できます。これは default enabled です。

無効化する場合は次のようにします。

```toml
[session]
resume_agents_on_restore = false
```

公式ドキュメントでは、Claude Code は `claude --resume <id>`、Codex は `codex resume <id>`、Hermes Agent は `hermes --resume <id>` などの resume command が示されています。

## agent integration

Herdr は agent を screen manifest や foreground process などから検出しますが、official integration を入れると session restore や state reporting が強化されます。Claude Code・Codex・Cursor Agent CLI・GitHub Copilot CLI・Hermes Agent などが integration 対象です。

```sh
herdr integration status
herdr integration install claude
herdr integration install codex
herdr integration install hermes
```

agent の状態がおかしいときは explain できます。

```sh
herdr agent explain <target>
```

Herdr の blocked 判定は意図的に厳しめで、既知の approval / question / permission UI に一致したときだけ `blocked` と判定します。そのため、新しい agent prompt などでは一時的に `idle` に見えることがあります。

## よく使うコマンド集

### 起動・接続

```sh
herdr
herdr --session work
herdr session attach work
herdr status
herdr status server
```

### 設定

```sh
herdr --default-config
herdr --default-config > ~/.config/herdr/config.toml
herdr server reload-config
```

### session

```sh
herdr session list
herdr session attach work
herdr session stop work
herdr session delete work
herdr session stop default
```

### workspace

```sh
herdr workspace list
herdr workspace create --cwd ~/project --label api
herdr workspace focus <workspace_id>
herdr workspace rename <workspace_id> <label>
herdr workspace close <workspace_id>
```

### tab

```sh
herdr tab list
herdr tab create --label logs
herdr tab focus <tab_id>
herdr tab rename <tab_id> logs
herdr tab close <tab_id>
```

### pane

```sh
herdr pane list
herdr pane current
herdr pane split --current --direction right
herdr pane split --current --direction down
herdr pane focus --direction left
herdr pane swap --direction right
herdr pane zoom --current --toggle
herdr pane rename <pane_id> <label>
```

### agent

```sh
herdr agent explain <target>
herdr agent rename w1:p1 reviewer
herdr agent rename reviewer --clear
herdr agent attach reviewer
```

### update

```sh
herdr update
herdr channel show
herdr channel set preview
herdr channel set stable
```

Herdr installer 管理の install なら `herdr update` で更新できます。Homebrew・mise・Nix で入れた場合は、それぞれの package manager で更新します。

## おすすめの運用

### 1. まずは default session だけで始める

最初から named session を増やしすぎると、どこに何があるか分かりにくくなります。まずは default session の中で workspace を分けるのがよいです。

```text
default session
  - catal
  - personal
  - experiments
  - infra
```

### 2. repo / task ごとに workspace を作る

Workspace は repo 単位が分かりやすいです。worktree を多用する場合は、branch / investigation ごとに workspace を分けるとよいです。

```sh
herdr workspace create --cwd ~/ghq/github.com/org/project --label project-main
herdr workspace create --cwd ~/ghq/github.com/org/project-feature --label project-feature
```

### 3. tab は役割で分ける

1 workspace の中で tab を次のように分けると見通しがよくなります。

```text
agents
server
logs
tests
review
```

### 4. agent には明確な役割名をつける

複数 agent を動かすなら、何をしている agent か分かる名前をつけるとよいです。

```sh
herdr agent rename w1:p1 reviewer
herdr agent rename w1:p2 implementer
herdr agent rename w1:p3 test-runner
```

### 5. 普段は stop ではなく detach

作業を残したいなら `prefix+q` で detach します。`server stop` や `session stop` は process も止まるので、終了したいときだけ使います。

```text
作業継続したい:     prefix+q
完全に閉じたい:     herdr server stop
sessionごと消したい: herdr session delete <name>
```

## 注意点

### Herdr の中で tmux を自動起動しない

Herdr の pane 内で shell framework が自動的に tmux に入ると、Herdr からは agent ではなく `tmux` が foreground process に見えることがあります。公式ドキュメントでも、Herdr は pane 内で起動された tmux session の奥にいる agent を inspect しないと説明されています。

Herdr を使うなら、少なくとも Herdr の pane 内では自動 tmux 起動を避けるのが安全です。

### pane history は secret に注意

`pane_history = true` は便利ですが、terminal 出力には token や秘密情報が残る可能性があります。開発機を共有する場合や機密情報を扱う場合は、default off のままが無難です。

### stop は process を止める

`herdr server stop` や `herdr session stop <name>` は、pane 内の process も止めます。長時間実行中の処理や agent 作業がある場合は、まず detach でよいか確認します。

## まとめ

Herdr は、AI coding agent を複数並行で動かす前提の terminal multiplexer です。tmux 的な永続 pane に加えて、agent の状態が sidebar に集約されるため、人間がすべての terminal を巡回するのではなく、`blocked` や `done` になったものだけを見る運用ができます。

最初は次の流れだけ覚えれば十分です。

```sh
herdr
# pane 内で claude / codex / hermes などを起動
```

```text
prefix+v              右に分割
prefix+minus          下に分割
prefix+c              tab 作成
prefix+h/j/k/l        pane 移動
prefix+shift+h/j/k/l  pane 入れ替え
prefix+q              detach
```

そして終了系はこの3つを区別します。

```text
detach: 抜けるだけ。process は生きる
stop:   session/server を止める。process も止まる
delete: 保存済み session state も消す
```

Herdr は「terminal を増やす道具」ではなく、**複数 agent を並列運用するための control room** だと考えると、使いどころが掴みやすくなります。

## 参考

- [Herdr 公式サイト](https://herdr.dev/)
- [Herdr ドキュメント](https://herdr.dev/docs/)
