---
title: axios@1.14.1 ハッキング報告
description: 2026-03-31 に npm 上で公開された axios@1.14.1 / 0.30.4 の supply chain compromise について、確認できる事実と初動対応をまとめます。
date: 2026-04-01
status: seed
tags:
  - security
  - npm
  - axios
  - supply-chain
  - incident-response
---

# axios@1.14.1 ハッキング報告

2026年3月31日、`axios@1.14.1` と `axios@0.30.4` が npm に公開され、その後すぐに「改ざんされた配布物だった」とみなされる状態になりました。

2026年4月1日時点で確認できる公開情報を先にまとめると、次のとおりです。

- npm registry の `time` には `1.14.1` と `0.30.4` の公開時刻が残っている
- いまの `dist-tags.latest` は `1.14.0` で、`1.14.1` は通常の最新安定版として扱われていない
- GitHub Releases の最新表示は `v1.14.0` で、`v1.14.1` の通常リリース痕跡が見当たらない
- JFrog と Snyk は、`plain-crypto-js@4.2.1` を注入した malicious release だったと報告している

このため、これは Axios 本体の通常の脆弱性というより、**npm 配布経路の乗っ取りに近い supply chain incident** と理解するのが自然です。

## 要点

- 影響バージョンとして扱うべきなのは `axios@1.14.1` と `axios@0.30.4`
- 安全側へ戻すなら、少なくとも `1.x` 系は `1.14.0`、`0.x` 系は `0.30.3` 以前を基準に見るのが妥当
- もし CI や開発端末で一度でもこれらを `npm install` していたなら、単なる「依存関係の更新ミス」ではなく、**環境侵害の可能性**として扱うべき
- 特に npm token、GitHub token、SSH key、クラウド認証情報、`.env` にあった secrets は漏えい前提で棚卸ししたほうが安全

## 確認できる事実

### npm registry に改ざん版の時刻が残っている

`https://registry.npmjs.org/axios` の `time` には、少なくとも次の publish timestamp が残っています。

- `1.14.0`: 2026-03-27T19:01:40.915Z
- `1.14.1`: 2026-03-31T00:21:58.168Z
- `0.30.3`: 2026-02-18T17:19:20.081Z
- `0.30.4`: 2026-03-31T01:00:57.285Z

同じ registry metadata の `dist-tags` では、2026年4月1日時点の `latest` は `1.14.0` に戻っています。
これは「`1.14.1` が正常な後継版として残っている」状態ではありません。

### GitHub Releases 側には通常の `v1.14.1` リリースが見えない

Axios の GitHub Releases では、2026年4月1日時点の最新表示が `v1.14.0` です。
少なくとも公開された通常の release workflow の痕跡としては `v1.14.1` を確認できません。

このギャップは、「GitHub 側の通常リリースではなく、npm 側へ直接 publish された可能性」を強く示唆します。
ただし、どの資格情報が侵害されたかまでは、この情報だけでは断定できません。

## 外部解析で報告されていること

ここから先は、Axios 本体の一次情報というより **セキュリティベンダーの解析報告** の要約です。
私はまだ該当 tarball を独自に reverse engineering したわけではないので、その点は分けて読みます。

### JFrog の報告

JFrog は、`axios@1.14.1` の `package.json` に `plain-crypto-js@4.2.1` が追加され、その依存が `postinstall` 経由で実行される構造だったと報告しています。

重要なのは、Axios 側の HTTP client ロジックが直接書き換えられたというより、**install 時にコード実行を起こす依存が差し込まれた** と読める点です。
このタイプの事故では、アプリ実行前でも `npm install` の時点で侵害が成立しえます。

### Snyk の報告

Snyk はこの件を `Embedded Malicious Code` として扱い、影響バージョンを `=1.14.1` と `=0.30.4` と明記しています。
また、npm 上から問題の内容が削除済みであること、`plain-crypto-js` が cross-platform RAT を隠す役割を持っていたことを整理しています。

## まだ断定しないほうがよい点

- 侵害されたのが maintainer の npm account だけなのか、GitHub account も含むのか
- 実際の download 数や、どれだけの CI が踏んだのか
- Linux / macOS / Windows での payload の完全な挙動
- `plain-crypto-js` の registry metadata が takedown 後にどう再構成されたか

このページでは、現時点では「malicious release が npm に一時的に存在した」「install した環境は侵害前提で扱うべき」という線までを、比較的堅い情報として扱います。

## 初動対応メモ

### 1. 依存関係を安全版へ戻す

`package.json` や lockfile に次が入っていないか確認します。

```bash
rg 'axios@1\\.14\\.1|axios@0\\.30\\.4|\"axios\": \"\\^?1\\.14\\.1|\"axios\": \"\\^?0\\.30\\.4' package.json package-lock.json pnpm-lock.yaml yarn.lock
```

見つかったら、安全版へ固定して lockfile を再生成します。

### 2. install 済み環境を「汚染済み候補」として扱う

次に該当するなら、端末や runner を clean 扱いしないほうがいいです。

- 2026-03-31 に自動更新で lockfile が進んだ
- CI が `npm install` / `npm ci` を回した
- Renovate / Dependabot 経由で悪性版を取り込んだ可能性がある

### 3. secrets を rotate する

最低でも次は見直し対象です。

- npm token
- GitHub token / PAT
- SSH key
- cloud credentials
- `.env` に置いていた API keys

### 4. ログを確認する

- CI 実行履歴
- registry / package proxy の取得ログ
- GitHub Actions の secret 利用履歴
- 不審な outbound network 通信

## この件から得られる教訓

最近の npm インシデントと同じく、今回も「人気パッケージだから安全」とは言えませんでした。
むしろ利用者が多い package ほど、publish pipeline と install script の監視が重要です。

最低限、次はやっておいたほうがよさそうです。

- lockfile diff を人間が読む
- publish 直後の最新版を即採用しない
- `postinstall` を許す依存を監視する
- CI で新規 publish から一定時間は保留する cooldown を入れる

## 一次情報源 / 参照

- [npm registry metadata for axios](https://registry.npmjs.org/axios)
- [Axios GitHub Releases](https://github.com/axios/axios/releases)
- [axios@1.14.1 and axios@0.30.4 are compromised · Issue #10604](https://github.com/axios/axios/issues/10604)
- [Cross-Platform Threat - Axios Package Compromise | JFrog Security Research](https://research.jfrog.com/post/axios-compromise/)
- [Embedded Malicious Code in axios | Snyk](https://security.snyk.io/vuln/SNYK-JS-AXIOS-15850650)

このページは incident memo です。今後 maintainer の正式な事後報告や npm 側の説明が出れば、内容を更新する前提で置いています。
