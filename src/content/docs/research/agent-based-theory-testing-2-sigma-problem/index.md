---
title: Agent-Based Theory Testing 2 Sigma Problem 開発日誌
description: Bloomの2シグマ問題をLLMエージェントで検証した論文の開発過程、負の結果、交絡監査、今後の自己査読をまとめる入口。
date: 2026-07-31
status: growing
tags:
  - research
  - paper
  - development-journal
  - agent-based-theory-testing
  - 2-sigma-problem
author: ai
provenance:
  source_type: ai_session
  source_ref:
    - "Codex session: 2026-07-11"
    - "User-provided project status: paper completed; reading-based updates planned"
    - "User retrospective and experiment timeline: 2026-05-13 to 2026-07-04"
    - "User retrospective: pre-self-review decision to include run data, 2026-07-14"
    - "User self-review memo: v1-v3, 2026-07-19"
    - "User self-review memo: v4, 2026-07-20"
    - "User self-review memo: v5, 2026-07-25"
    - "User self-review memo: v6 and v5 follow-up, 2026-07-30 to 2026-07-31"
    - https://github.com/geeknees/Agent-Based-Theory-Testing-2-Sigma-Problem
    - https://doi.org/10.5281/zenodo.21186083
  ai_process:
    - extract
    - summarize
    - synthesize
    - structure
  confidence: medium
  review_needed: true
knowledge_status:
  claim_status: active
  contradiction_review: none
---

<!--
ABOUTME: Agent-Based Theory Testing 2 Sigma Problemの研究開発日誌を案内するページ。
ABOUTME: 研究の現在地、未解決事項、個別の日誌、正本リポジトリを結び付ける。
-->

# Agent-Based Theory Testing 2 Sigma Problem 開発日誌

このページは、`Agent-Based-Theory-Testing-2-Sigma-Problem` の論文開発日誌をまとめる入口です。
論文は完成していますが、今後、著者自身が内容を読み直しながら理解、解釈、関連文献を更新していく予定です。
このページでは、完成済みの論文と、その後も続く読解・再評価の過程を分けて記録します。

> **Update:** 2026年7月20日、v4のセルフ査読を実施しました。主数値は維持し、L3を「全条件0%」とした説明を訂正しました。集団授業の高得点は、1対1指導が4往復で終わることや、同じ授業を共有した学習者を独立に数えられないことなどから、Bloom理論の反証とは扱いません。

> **Update:** 2026年7月25日、v5のセルフ査読を実施しました。主数値は維持し、1on1学習者の高得点を誤概念修正へ帰属した説明を、Yellow=7を含むルールカバレッジの完全性へ訂正しました。論文本文への波及はありません。

> **Update:** 2026年7月31日、v6のセルフ査読を完了しました。主数値は維持しましたが、タイプ別の±25ポイントが各条件1名・8問中2問の差だったため、論文の実効nの説明を訂正しました。v5についても、主要なプロファイルが学習者本人へ渡っていなかった実装上の非対称性を追記しました。

## 現在地

- 論文: 完成
- 日誌: 実験と論文化のベース日誌、実行データの公開判断、v1–v6のセルフ査読を公開
- 研究上の問い: LLMエージェント環境でBloomの2シグマ効果は再現するか
- 結果: 7世代を通じて再現せず。v9c2では教育条件間差10pp、学習者タイプ間差38pp
- 方法論上の成果: F1–F5の交絡分類とAコードの是正手順
- 現在の研究段階: セルフ査読中。v1–v6を完了し、v7以降は未着手
- 最終更新: 2026-07-31にv6のセルフ査読とv5へ遡る実装確認を追加

## 開発日誌

- [v6を30分査読し、±25ポイントの人数と学習者差の作り方を問い直す](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-31-self-review-v6/)
- [v5を30分査読し、個別指導の高得点を「必要なルールが記憶に残ったか」から説明し直す](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-25-self-review-v5/)
- [v4を25分で査読し、集団授業の高得点をBloom理論の反証と読まない](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-20-self-review-v4/)
- [v1–v3を80分かけて査読し、天井効果の説明を直す](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-19-self-review-v1-v3/)
- [セルフ査読の前に、実行データを公開対象へ戻す](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-14-include-run-data-before-self-review/)
- [7世代の負の結果から、交絡を監査するまで](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-04-seven-generation-negative-result/)

今後、論文を読み直して理解や評価が変わったときは、新しい日誌を追加してここへ新しい順にリンクします。

## 次に記録したいこと

- v7以降のclaim→evidence査読
- v7bで`order_confused`の操作が実体として成立していたかの確認
- v1とv3に関する開発ログの訂正
- `evaluation_tasks.prompt`の世代間再利用がほかのrunへ与える影響
- 関連文献との一致点、相違点、矛盾候補
- 現在の主張を維持するか、更新するか
- 次に読む箇所または文献

記録を追加するときは[論文開発日誌テンプレート](/experimental-commons/research/journal-template/)を使います。

## 一次情報源

- [geeknees/Agent-Based-Theory-Testing-2-Sigma-Problem](https://github.com/geeknees/Agent-Based-Theory-Testing-2-Sigma-Problem)
- [Working paper and research artifact v1.0.0](https://doi.org/10.5281/zenodo.21186083)
- 著者によるv1–v3セルフ査読メモ（2026-07-19）
- 著者によるv4セルフ査読メモ（2026-07-20）
- 著者によるv5セルフ査読メモ（2026-07-25）
- 著者によるv6セルフ査読メモとv5への追記（2026-07-30〜31）
