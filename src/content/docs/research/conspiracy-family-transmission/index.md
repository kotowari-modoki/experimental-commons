---
title: conspiracy_family_transmission 開発日誌
description: conspiracy_family_transmissionの論文開発で生じた問い、実験、判断、未解決事項を時系列で記録する入口。
date: 2026-08-29
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
    - "User self-review memo: conspiracy_family_transmission v5a, 2026-08-09"
    - "User self-review memo: conspiracy_family_transmission v6, 2026-08-15"
    - "User self-review memo: conspiracy_family_transmission v7, 2026-08-22"
    - "User self-review memo: conspiracy_family_transmission v8, 2026-08-29"
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
- 日誌: テーマ選定の動機、YouTube経由の浸透に関する観察、v11からv13までの転換、v1–v11の整合性監査、v1–v8のセルフ査読、v3の会話観察を公開
- 現在の問い: v9–v13で、判定状態だけでは見逃す退化スコア、会話を見ない自己申告、役柄外テキストの混入をどこまで検出・隔離できるか
- 現在の仮説: 質問の種類だけでなく応答の柔らかさも対話の継続に関わる可能性がある。ただしv8では柔らかさを操作していないため、要検証である
- 進行中の作業: v9–v13への影響を個別に確認し、採点理由と数値の矛盾検出、会話履歴と現在状態を渡す最終評価、役柄外テキストの隔離を備えた測定器を再設計する
- 最終更新: 2026-08-29にv8のセルフ査読を完了。盲検判定器は人間の読解と一部で一致し、強い逆向きの条件差も捉えた。一方、全項目0の退化スコア1件が結果解釈の一部を作っていた

## 開発日誌

- [v8を査読し、予想外の結果と採点の異常を見直す](/experimental-commons/research/conspiracy-family-transmission/journal/2026-08-29-self-review-v8/)
- [v7を査読し、順序と用量の実験で出力制御の難しさに突き当たる](/experimental-commons/research/conspiracy-family-transmission/journal/2026-08-22-self-review-v7/)
- [v6を査読し、演じ分けと結果の変化を切り分ける](/experimental-commons/research/conspiracy-family-transmission/journal/2026-08-15-self-review-v6/)
- [v5aを査読し、「交絡のない対照」で測定器の向きを確かめる](/experimental-commons/research/conspiracy-family-transmission/journal/2026-08-09-self-review-v5a/)
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
- v9以降の主張、判定コード、生データのセルフ査読
- v4–v13の会話を見ない最終評価が、各世代の主張へ与える影響
- 役柄外テキストの検出、隔離、再採点をどの段階で行うか
- 有効判定の中に残る退化スコアと、採点理由・数値の矛盾をどう検出するか
- 質問の種類と応答の柔らかさを分けて操作できるか
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
- 著者によるv5aセルフ査読メモ（2026-08-09）
- 著者によるv6セルフ査読メモ（2026-08-15）
- 著者によるv7セルフ査読メモ（2026-08-22）
- 著者によるv8セルフ査読メモ（2026-08-29）
- 著者によるYouTubeレコメンドと陰謀論的言説の拡散についての観察メモ（2026-07-29）
- [地方で聞いた陰謀論的ナラティブについての投稿](https://x.com/rootsy/status/2082027473106301437)
- [党派性の薄い層とYouTube動画についての続報](https://x.com/rootsy/status/2082257460723925302)
- [geeknees/conspiracy_family_transmission](https://github.com/geeknees/conspiracy_family_transmission)
