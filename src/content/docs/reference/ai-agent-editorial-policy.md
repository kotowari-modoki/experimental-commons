---
title: AI Agent Editorial Policy
description: AI支援で知識を編集するときの出典、確信度、矛盾検出、append-only editing の運用方針。
date: 2026-05-21
status: growing
tags:
  - reference
  - ai
  - agents
  - editorial-policy
---

# AI Agent Editorial Policy

`experimental-commons` は、完成した百科事典ではなく、実験中の知識を公開しながら育てるデジタルガーデンです。
AIエージェントは、執筆速度を上げるためだけでなく、由来、未確定性、矛盾、再編集の手がかりを残すために使います。

## 基本姿勢

- 完成度より鮮度と誠実さを優先する
- 不確かなことは不確かなまま書く
- 一次情報源や根拠へ辿れるようにする
- AI処理を隠さず、必要に応じて `provenance` に残す
- 過去ノートを黙って上書きしない

## AIができること

- 調査メモや会話ログから claim、論点、例、疑問を抽出する
- 複数ノートの関係を比較し、関連リンクを提案する
- MOC、index、タグ、backlink の候補を出す
- 古い仮説と新しい観察の差分を整理する
- 読みにくいノートを構造化する

## AIに任せきらないこと

- 根拠が弱い主張を強く断定すること
- 非公開情報や個人情報を公開ページへ入れること
- 既存の主張を理由なく置き換えること
- 価値判断や公開リスクを人間レビューなしに確定すること
- 出典を読んでいないのに読んだように書くこと

## PRコメントに残すこと

コンテンツを追加・変更したPRには、少なくとも次を残す。

- source: 主な情報源
- ai_process: 要約、抽出、統合、書き換え、fact check など
- confidence: `low` / `medium` / `high`
- review_needed: 人間レビューが必要か
- related_notes: 関係する既存ページ
- contradiction_review: 矛盾レビューの有無

## 矛盾の扱い

矛盾は、次の種類に分けて扱う。

- factual conflict
- changed assumption
- stale information
- terminology mismatch
- priority conflict
- subjective re-evaluation
- curriculum mismatch
- safety concern
- age-level mismatch

このリポジトリでは、矛盾を見つけたら即時修正するのではなく、レビュー候補として残す。
古いノートが時代遅れでも、過去の思考の経路として価値がある場合がある。

## Append-only Editing

知識編集は、できるだけ append-only に進める。
単純な誤字や壊れたリンクは直してよいが、説明・仮説・判断の意味が変わる場合は、差分を追えるようにする。

- 旧説明を残したまま update note を足す
- 新しいページから古いページへ `supersedes` を張る
- 古いページに `superseded_by` を張る
- 比較ノートを作る
- MOC や index に「現在の入口」を明示する

## 公開してよい不完全さ

次を満たすなら、`seed` や `growing` として公開候補にできる。

- 未完成であることが見える
- どこが仮説か分かる
- 出典または観察の由来が追える
- 読者が信頼度を判断できる
- 将来の編集者がどこから直せばよいか分かる
