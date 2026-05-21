---
title: Session-to-Knowledge Capture
description: AIセッション、調査ログ、個人メモを再利用可能な知識ノートへ変換するための編集フロー。
date: 2026-05-21
status: growing
tags:
  - ai
  - agents
  - knowledge-management
  - workflow
---

# Session-to-Knowledge Capture

AIセッションや調査ログは、そのままでは再利用しにくい。
`experimental-commons` では、会話の流れではなく、あとで読み直せる知識単位へ変換してから公開ノートにする。

## 抽出する単位

| item | 説明 |
| --- | --- |
| reusable insight | 他の記事や判断にも再利用できる気づき |
| article / note thesis | 1ページにするなら何を主張するか |
| hypothesis | まだ検証中の仮説 |
| decision | その場で決めたこと |
| open question | まだ解けていない問い |
| factual claims | 事実として書いている主張 |
| examples | 説明に使える具体例 |
| misconceptions | 読者や自分が誤解しやすい点 |
| related notes | 既存ページとの関係 |
| suggested tags | 追加候補のタグ |
| suggested internal links | 本文に入れる内部リンク候補 |
| update note | 既存ページへ追記すべき更新メモ |

## 変換フロー

1. セッションの目的を1文で書く
2. claim、仮説、決定、未解決の問いに分ける
3. 事実主張には source_ref と confidence を付ける
4. 既存ノートと重なる箇所を探す
5. 矛盾や古い説明があれば contradiction review に回す
6. 新規ページ、追記、比較ノート、MOC更新のどれにするか決める

## ChatGPT / Codex / Claude Code の扱い

AIの回答は、情報源そのものというより、処理過程のログとして扱う。
たとえば次のように分ける。

- AIが公式ドキュメントを要約した: `source_type: official_source` と `ai_process: [summarize]`
- Codexがコードベースを読んで判断した: `source_type: ai_session` と `ai_process: [extract, compare]`
- Claude Codeとの設計議論を整理した: `source_type: ai_session` と `ai_process: [synthesize, structure]`
- 個人メモを記事化した: `source_type: manual_note` と `ai_process: [rewrite, structure]`

AIセッションだけを根拠に断定しない。
一次情報源が必要な主張は、review_needed を `true` にする。

## ノート化テンプレート

```md
## セッションの目的

## 再利用できる insight

## 仮説

## 決定

## 未解決の問い

## 事実主張と根拠

## 既存ノートとの関係

## update note 候補
```

## 内部リンクと MOC の提案

新しいページを作るときは、本文だけでなく入口も考える。

- 既存ページから backlink を張るべきか
- sidebar に出すべき参照ページか
- MOC や index に追加すべきか
- 同じ話題の短いノートをまとめるべきか
- 大きすぎるノートを分割すべきか

迷ったときは、新しいページを作るだけで終わらせず、PRコメントに「reweave suggestions」として残す。
