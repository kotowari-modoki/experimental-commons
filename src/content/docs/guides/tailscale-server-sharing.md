---
title: Tailscale でサーバーをチーム共有する標準設定
description: Tailscale を使って、サーバー用PCをチームで安全に共有するための標準設定。アクセス制御 (ACL) や SSH の構成を整理します。
date: 2026-04-04
status: evergreen
tags:
  - tailscale
  - server
  - sharing
  - network
  - security
  - acl
  - ssh
author: ai
---
Tailscale を使って、サーバー用PCをチームで安全に共有するための標準設定をまとめます。
この文書の目的は、**プライベートネットワーク上で安全に共有する方法を整理すること**です。

## 基本方針

まず前提として、共有するのは端末やアカウントではなく、**ネットワークへの接続権限**です。

### 行うこと

* 各メンバーが自分の Tailscale アカウントで参加する
* サーバー用PCを Tailscale ネットワークに参加させる
* アクセス制御は ACL で行う
* 日常的な作業は SSH を基本とする

### 行わないこと

* Tailscale のログイン情報を共有する
* 共用端末を作って使い回す
* `tailscale set --shields-up=true` を通常運用のアクセス制御として使う

## 全体構成

```text
各メンバーのPC
  ↓
Tailscaleプライベートネットワーク
  ↓
サーバー用PC
```

この構成では、端末そのものを共有するのではなく、各メンバーがそれぞれの端末から同じプライベートネットワークに参加して、サーバー用PCへアクセスします。

## サーバー用PCの設定

### 1. Tailscale のインストール

Linux の場合は次のようにインストールします。

```bash
curl -fsSL https://tailscale.com/install.sh | sh
```
### 2. サーバー用PCを Tailscale に参加させる

Tailscale SSH も利用する場合は、次のように設定します。

```bash
sudo tailscale up --ssh --advertise-tags=tag:server
```

この設定で行っていることは以下の3点です。

* Tailscale ネットワークに参加する
* Tailscale SSH を有効化する
* 端末に `tag:server` を付与する

### 3. 管理画面でタグを承認する

Tailscale Admin Console で対象端末を開き、付与したタグを承認します。

## Tailscale SSH とは

Tailscale SSH は、SSH 鍵の管理（公開鍵の配布など）を Tailscale が肩代わりする機能です。
従来の SSH と比較して、次のようなメリットがあります。

* **鍵管理が不要**: メンバーごとに SSH 鍵を作成・登録する必要がありません。
* **ID ベースの認可**: Tailscale のアカウント（Google, Microsoft, GitHub 等）に基づいてアクセスを制御します。
* **ACL との統合**: 誰がどの端末に接続できるかを ACL 一箇所で管理できます。
* **セッション記録**: 管理画面の設定により、SSH セッションの操作ログを記録することも可能です（一部プラン）。
* **認証の強化**: 必要に応じて、接続時に再認証（Check mode）を求める設定も可能です。

従来の SSH クライアントからもそのまま利用できますし、`tailscale ssh` コマンドを使うことで、よりシームレスに接続できます。
## GUI での設定方法

CLI を使わずに設定する場合は、管理画面から設定できます。

### 管理画面から行う場合

1. Tailscale Admin Console を開く
2. Machines から対象のサーバー用PCを選ぶ
3. SSH を有効化する
4. タグを設定する
   例: `tag:server`

### ローカルアプリから行う場合

OS やバージョンによって表示は異なりますが、Tailscale アプリの設定画面から SSH を有効化できる場合があります。

## ACL 設計

最小構成の例は次のとおりです。

```json
{
  "groups": {
    "group:admin": ["admin"],
    "group:member": ["member1", "member2"]
  },
  "tagOwners": {
    "tag:server": ["group:admin"]
  },
  "ssh": [
    {
      "action": "accept",
      "src": ["group:admin"],
      "dst": ["tag:server"],
      "users": ["root", "developer"]
    },
    {
      "action": "accept",
      "src": ["group:member"],
      "dst": ["tag:server"],
      "users": ["developer"]
    }
  ]
}
```

### この設定の意味

`groups` では、誰をどの役割として扱うかを定義します。
たとえば `group:admin` は管理者、`group:member` は一般メンバーです。

`tagOwners` では、そのタグ付き端末をどのグループが管理できるかを定義します。

`ssh` では、どのグループのメンバーが、どの端末に、どのOSユーザーで SSH 接続できるかを定義します。SSH 鍵を個別に登録しなくても、この ACL の設定だけで接続が許可されます。
## 推奨運用

### 管理者

* サーバー用PCのタグ管理を行う
* ACL を更新する
* 必要な場合のみ管理者権限でログインする

### 一般メンバー

* 一般ユーザーで接続する
* 日常作業は管理者権限なしで行う

## 接続方法

最も推奨されるのは `tailscale ssh` コマンドです。

```bash
tailscale ssh developer@server-name
```

通常の SSH クライアントもそのまま使えます。

```bash
ssh developer@server-name
```

または IP を指定して接続します。

```bash
ssh developer@100.x.x.x
```

Tailscale SSH を使う場合、初回または条件によってはブラウザでの再認証（Check mode）が必要になることがあります。
## `shields-up` を通常運用で使わない理由

```bash
tailscale set --shields-up=true
```

この設定は、特定の相手だけを拒否するものではなく、その端末への受信接続を広く遮断するものです。

通常運用で使うと、次のような問題が起こりやすくなります。

* SSH 接続もできなくなる
* GUI 接続もできなくなる
* ACL が正しくても接続できなくなる
* リモート運用中に設定すると再接続できなくなることがある

そのため、`shields-up` は通常のアクセス制御ではなく、**一時的な隔離や緊急時の遮断**に限って使うのが適切です。

## GUI 接続の扱い

画面共有や VNC などの GUI 接続は、製品や OS の制約により同時接続数が少ないことがあります。

そのため、運用としては以下が適切です。

* 基本は SSH を使う
* GUI 操作は必要なときだけ行う
* GUI 前提の作業を減らす

## セキュリティ上の推奨設定

サーバー側の SSH 設定では、少なくとも次の設定を推奨します。

```text
PasswordAuthentication no
PermitRootLogin no
```

この設定により、パスワード認証を無効化し、root の直接ログインを防ぎます。
個別認証と権限分離を前提にした運用にしやすくなります。

## この方式のメリット

* 各自のアカウントで認証できる
* ログイン情報を共有しなくてよい
* **SSH 鍵の配布・管理が一切不要になる**
* 誰が接続したか追跡しやすい
* 権限をグループ単位で管理できる
* チームが増えても運用しやすい

## まとめ

正しい共有方法は、Tailscale のログイン情報を共有することではなく、**各メンバーが自分のアカウントで同じプライベートネットワークに参加し、ACL で接続を制御すること**です。

要点をまとめると、以下の4点です。

* 共有するのはアカウントではなくネットワーク
* アクセス制御は ACL で行う
* 通常運用は Tailscale SSH を基本にする
* `shields-up` は緊急時以外使わない
