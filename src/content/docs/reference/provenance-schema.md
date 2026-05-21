---
title: Provenance Schema
description: 知識の由来、AI処理、確信度、過去ノートとの関係を残すための optional metadata。
date: 2026-05-21
status: growing
tags:
  - reference
  - provenance
  - ai
  - editorial-policy
---

# Provenance Schema

`provenance` は、ページに入った知識が「どこから来て、どの処理を経て、どの程度信じられる状態か」を残すための optional metadata です。
このサイトでは未完成の観察や仮説も扱うため、正しさを装うより、由来と不確かさを明示することを優先します。

## provenance の目的

- 読者が情報源と確信度を確認できるようにする
- AIセッション、調査、個人メモから入った知識をあとで再検証できるようにする
- 古い仮説と新しい観察の関係を消さずに残す
- reweave や MOC 更新の候補を見つけやすくする

## frontmatter 例

```yaml
provenance:
  source_type: ai_session
  source_ref: "Codex session: 2026-05-21"
  captured_at: 2026-05-21
  ai_process:
    - extract
    - synthesize
    - structure
  confidence: medium
  related_notes:
    - /ai/agents/git-worktree-with-codex/
  review_needed: true

knowledge_status:
  claim_status: tentative
  supersedes:
    - /ai/agents/old-agent-workflow/
  related_notes:
    - /ai/agents/session-to-knowledge-capture/
  contradiction_review: required
```

## source_type

| value | 使いどころ |
| --- | --- |
| `personal_experience` | 実践、観察、現場メモ |
| `official_source` | 公式ドキュメント、仕様、一次発表 |
| `book` | 書籍、章、ページ番号を伴う参照 |
| `paper` | 論文、preprint、技術報告 |
| `web_research` | Web調査から得た情報 |
| `ai_session` | ChatGPT / Codex / Claude Code などの対話 |
| `manual_note` | 個人メモ、手入力の整理 |
| `curriculum_guideline` | 学習指導要領などの教育基準 |
| `other` | 上記に当てはまらないもの |

`source_ref` には、URL、書誌情報、メモ名、会話名、調査ログ名など、あとで辿れる手がかりを書く。
秘密情報や非公開情報は残さない。

## ai_process

| value | 意味 |
| --- | --- |
| `summarize` | 長い情報を要約した |
| `translate` | 翻訳した |
| `classify` | 分類した |
| `extract` | claim、論点、例などを抽出した |
| `compare` | 複数情報を比較した |
| `synthesize` | 複数情報を統合した |
| `critique` | 批評、弱点抽出、反証をした |
| `rewrite` | 読みやすく書き換えた |
| `fact_check` | 事実確認をした |
| `structure` | 構成や見出しを整理した |

複数ある場合は配列で残す。
AIが関与していても、最終的な編集責任は人間レビューとリポジトリ運用に残る。

## confidence

| value | 使いどころ |
| --- | --- |
| `low` | 出典が弱い、観察が少ない、仮説段階 |
| `medium` | 複数の根拠があるが、まだ要検証 |
| `high` | 一次情報源や十分な検証がある |

`high` は「永久に正しい」ではない。
現時点で根拠が強い、という意味にとどめる。

## claim_status

| value | 意味 |
| --- | --- |
| `active` | 現時点で有効な説明や判断 |
| `tentative` | 仮説、観察、要検証 |
| `superseded` | 新しい説明や判断に置き換えられた |
| `archived` | 歴史的記録として残す |

古い仮説を消す必要があるとは限らない。
`superseded` や `archived` にして、何に置き換わったのかを残すほうが、このサイトの編集履歴として価値がある。

## contradiction_review

| value | 意味 |
| --- | --- |
| `none` | 既知の矛盾レビューなし |
| `required` | 既存ノートとの矛盾や不一致があり、人間判断が必要 |
| `reviewed` | 矛盾を確認し、扱いを決めた |

矛盾は失敗ではなく、知識が育っているサインとして扱う。
ただし、自動で過去ノートを上書きしない。

## Append-only Editing

原則として、既存ノートの意味を黙って変えない。
古い説明を更新する場合は、次のいずれかを残す。

- update note
- `supersedes` / `superseded_by`
- related notes
- comparison note
- MOC / index の更新候補

明らかな誤字や壊れたリンクの修正は通常の編集でよい。
主張、判断、用語、優先順位が変わる場合は、編集の理由を追えるようにする。

## Reweave Suggestions の例

- keep both: 古い仮説と新しい観察を並べて残す
- add update note: 旧ページの冒頭に更新注記を加える
- mark old note as superseded: 古い説明を置き換え済みにする
- create comparison note: 対立する説明を比較する新規ノートを作る
- update index / MOC: 関連ページの入口を更新する
- add backlink: 新旧ページを相互リンクする
- split overloaded note: 1ページに詰め込みすぎた論点を分ける
- merge related notes: 重複する短いノートを統合する
- ask human for judgment: 価値判断や公開リスクがある場合は人間へ戻す
