---
title: Contradiction Detection and Reweaving
description: 新しい知識が既存ノートと矛盾するとき、自動上書きせずレビュー候補として扱うための運用メモ。
date: 2026-05-21
status: growing
tags:
  - ai
  - agents
  - contradiction
  - reweave
---

# Contradiction Detection and Reweaving

新しい知識は、過去ノートを単純に「正す」ためだけにあるわけではない。
古い仮説、古い観察、古い判断も、当時の思考経路として価値を持つ。
そのため、このサイトでは矛盾を見つけても自動で上書きせず、レビュー候補として扱う。

## 矛盾の種類

| type | 例 |
| --- | --- |
| factual conflict | 数値、日付、仕様、引用内容が食い違う |
| changed assumption | 前提としていたツール、環境、制約が変わった |
| stale information | 以前は正しかったが、今は古い |
| terminology mismatch | 同じ概念に違う用語を使っている |
| priority conflict | 以前の評価軸と新しい評価軸が違う |
| subjective re-evaluation | 価値判断や解釈が変わった |
| curriculum mismatch | 教育文脈の基準とずれている |
| safety concern | 公開リスクや安全面の懸念がある |
| age-level mismatch | 想定読者の難易度と合っていない |

## レビュー候補として残す情報

- どのページと矛盾するか
- 矛盾の種類
- 新旧どちらの根拠が強いか
- 片方を残す理由があるか
- 人間判断が必要か
- reweave suggestion

## reweave の提案アクション

| action | 使いどころ |
| --- | --- |
| keep both | どちらも観察として価値がある |
| add update note | 古いページに短い注記を足せば十分 |
| mark old note as superseded | 新しい説明へ置き換えたことを明示する |
| create comparison note | 対立の構造そのものを記事にする |
| update index / MOC | 読者の入口を新しい理解へ向ける |
| add backlink | 関連ページを相互に辿れるようにする |
| split overloaded note | 論点が混ざりすぎている |
| merge related notes | 重複が多く、1ページにしたほうがよい |
| ask human for judgment | 公開リスク、価値判断、専門判断が必要 |

## 自動上書きしない原則

AIエージェントは、矛盾を見つけても勝手に過去ノートを消さない。
提案はしてよいが、次のどれかで編集履歴を残す。

- `knowledge_status.contradiction_review: required`
- 本文冒頭の update note
- PRコメントの contradiction review
- 比較ノート
- `supersedes` / `superseded_by`

## PRコメント例

```md
source: Codex session and existing notes
ai_process: extract, compare, synthesize, structure
confidence: medium
review_needed: true

contradiction_review:
- type: stale information
- old note: /ai/agents/old-agent-workflow/
- new note: /ai/agents/session-to-knowledge-capture/
- suggested action: add update note and backlink
```

## 判断の基準

読者が「今どれを読めばよいか」を迷うなら、MOC、index、sidebar、冒頭注記のどれかを更新する。
研究メモとして古い仮説も価値があるなら、keep both を選ぶ。
危険、不正確、誤解を招く内容なら、公開のままにするかどうかを人間レビューに戻す。
