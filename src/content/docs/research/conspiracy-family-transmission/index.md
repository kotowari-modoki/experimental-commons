---
title: conspiracy_family_transmission 開発日誌
description: conspiracy_family_transmissionの論文開発で生じた問い、実験、判断、未解決事項を時系列で記録する入口。
date: 2026-08-01
status: seed
tags:
  - research
  - paper
  - development-journal
  - conspiracy-family-transmission
author: ai
provenance:
  source_type: ai_session
  source_ref:
    - "Codex session: 2026-07-11"
    - "User-provided project status: in progress and unpublished"
    - "User research memo: v11 to v12, 2026-07-13"
    - "User retrospective: motivation for choosing conspiracy theory as the third research theme, 2026-07-13"
    - "User research memo: backdated consistency audit across v1-v11, 2026-07-14"
    - "User research memo: v13 warmth dose-response, 2026-07-15"
    - "User self-review memo: conspiracy_family_transmission v1, 2026-07-20"
    - "User self-review memo: conspiracy_family_transmission v2, 2026-07-20"
    - "User observation memo: conspiracy_family_transmission v3 grandparent transcript, 2026-07-25"
    - "User self-review memo: conspiracy_family_transmission v3, 2026-07-25"
    - "User self-review memo: conspiracy_family_transmission v4, 2026-07-31 to 2026-08-01"
    - "User observation memo: YouTube recommendations and the spread of conspiratorial narratives, 2026-07-29"
    - https://x.com/rootsy/status/2082027473106301437
    - https://x.com/rootsy/status/2082257460723925302
    - https://github.com/geeknees/conspiracy_family_transmission
  ai_process:
    - extract
    - synthesize
    - structure
    - rewrite
  confidence: medium
  review_needed: true
knowledge_status:
  claim_status: tentative
  contradiction_review: required
---

<!--
ABOUTME: conspiracy_family_transmissionの研究開発日誌を時系列で案内するページ。
ABOUTME: 未公開研究の境界を守りながら、著者が公開を認めた個別メモへ結び付ける。
-->

# conspiracy_family_transmission 開発日誌

このページは、`conspiracy_family_transmission` の論文開発日誌をまとめる入口です。
研究は現在進行中で、論文と研究内容の全体は未公開です。
全体は未公開のまま、著者が明示的に公開範囲を指定した開発日誌だけを、このページから公開します。

## 現在地

- プロジェクト: 進行中
- 公開状態: 論文・研究内容の全体は未公開
- 日誌: テーマ選定の動機、YouTube経由の浸透に関する観察、v11からv13までの転換、v1–v11の整合性監査、v1–v4のセルフ査読、v3の会話観察を公開
- 現在の問い: v4–v13で会話を見ない最終評価から作られた主要指標を、どこまで再解釈する必要があるか
- 現在の仮説: v4–v13の主要な結果指標は会話履歴と現在状態を受け取らない最終評価に依存しており、介入効果と対象成立の従来解釈は世代ごとの再評価が必要
- 進行中の作業: v5–v13への影響を個別に確認し、会話履歴、現在状態、独立評価を備えた測定機を再設計する
- 最終更新: 2026-08-01に、v4のセルフ査読とv4–v13の横断確認から、最終評価が会話を見ないまま主要指標を作っていたことを記録

## 開発日誌

- [v4を120分査読し、会話を見ない最終評価がv13まで伝播していたと確認する](/experimental-commons/research/conspiracy-family-transmission/journal/2026-08-01-self-review-v4/)
- [YouTube経由の浸透を語る現地観察から、研究の切迫性を感じる](/experimental-commons/research/conspiracy-family-transmission/journal/2026-07-29-youtube-recommendation-concern/)
- [v3を120分査読し、5仮説中3件を撤回する](/experimental-commons/research/conspiracy-family-transmission/journal/2026-07-25-self-review-v3/)
- [v3のログから、「月光ガラス」と「ため息エネルギー」の町が立ち上がる](/experimental-commons/research/conspiracy-family-transmission/journal/2026-07-25-v3-moonlight-glass-story/)
- [v2を40分で査読し、条件を伏せた採点120件がすべて既定値だったと確認する](/experimental-commons/research/conspiracy-family-transmission/journal/2026-07-20-self-review-v2/)
- [v1をセルフ査読し、生成コードとレポートの食い違いを直す](/experimental-commons/research/conspiracy-family-transmission/journal/2026-07-20-self-review-v1/)
- [v13：温かさは変わったが、孤立関連指標は動かなかった](/experimental-commons/research/conspiracy-family-transmission/journal/2026-07-15-v13-warmth-null-and-pause/)
- [v1–v11を遡って不整合を点検する](/experimental-commons/research/conspiracy-family-transmission/journal/2026-07-14-consistency-audit-v1-v11/)
- [第3弾に陰謀論を選んだ理由](/experimental-commons/research/conspiracy-family-transmission/journal/2026-07-13-why-conspiracy-theory/)
- [v11からv12：伝搬の行き詰まりから「温かさのない境界」へ](/experimental-commons/research/conspiracy-family-transmission/journal/2026-07-13-v11-to-v12/)

この日誌は途中から始まります。
v10以前の査読・開発メモは将来遡って追加する可能性がありますが、現時点では予定を確定していません。

## 今後記録したいこと

- v13の結果を踏まえた新しい切り口（現時点では未決定）
- v5以降の主張、判定コード、生データのセルフ査読
- v4–v13の会話を見ない最終評価が、各世代の主張へ与える影響
- 条件を伏せた採点器（盲検scorer）の配線修正と再実行
- LLMエージェントで孤立状態を再現・維持できるか
- 同一モデルによる評価の妥当性
- モデル系列ごとの聞き手の採用挙動
- 情報源側の強さ（`source-side strength`）と採用の関係
- v10以前の判断を再構成できる資料があるか

記録を追加するときは[論文開発日誌テンプレート](/experimental-commons/research/journal-template/)を使います。

## 公開境界

- 未公開の論文本文、データ、結果を、著者の明示的な許可なく転載しない
- 身近な具体的事例や、関係者を推測できる情報を記載しない
- 査読、投稿、共同研究に関する非公開情報を記録しない
- 詳細を追加する前に、著者が公開範囲を明示しているか確認する
- 公開前に残す必要がある個人メモは、この公開リポジトリとは別の場所で管理する

## 一次情報源

- 著者によるテーマ選定の振り返り（2026-07-13、個別事例は非公開）
- 著者によるv11からv12への研究メモ（2026-07-13）
- 著者による整合性監査の研究メモ（2026-07-14）
- 著者によるv13 warmth dose-responseの研究メモ（2026-07-15）
- 著者によるv1セルフ査読メモ（2026-07-20）
- 著者によるv2セルフ査読メモ（2026-07-20）
- 著者によるv3祖父母エージェント会話の観察メモ（2026-07-25）
- 著者によるv3セルフ査読メモ（2026-07-25）
- 著者によるv4セルフ査読メモ（2026-07-31から2026-08-01）
- 著者によるYouTubeレコメンドと陰謀論的言説の拡散についての観察メモ（2026-07-29）
- [地方で聞いた陰謀論的ナラティブについての投稿](https://x.com/rootsy/status/2082027473106301437)
- [党派性の薄い層とYouTube動画についての続報](https://x.com/rootsy/status/2082257460723925302)
- [geeknees/conspiracy_family_transmission](https://github.com/geeknees/conspiracy_family_transmission)
