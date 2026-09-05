---
title: Agent-Based Theory Testing 2 Sigma Problem 開発日誌
description: Bloomの2シグマ問題をLLMエージェントで検証した論文の開発過程、負の結果、交絡監査、今後の自己査読をまとめる入口。
date: 2026-09-05
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
    - "User self-review memo: v7a and v7b, 2026-08-09"
    - "User self-review memo: v8, 2026-08-15"
    - "User self-review memo: v9b, 2026-08-22"
    - "User self-review memo: v9c, 2026-08-29"
    - "User self-review memo: v9c2, 2026-09-05"
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

## 査読の更新履歴

- **2026-09-05 — [v9c2](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-09-05-self-review-v9c2/):** 討論への記憶データ受け渡しと各条件5本の独立反復が機能したことを確認。条件差は約10ポイントへ縮んだ一方、準備確認4問中2問の例題重複、講座＋自己省察条件の反復不足と学習量の非対称が残り、「効果なし」とは判断しない
- **2026-08-29 — [v9c](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-08-29-self-review-v9c/):** 37.5ポイントの得点差は観測値として維持。討論への記憶データ欠落、各条件1本の独立討論、学習予算の非対称、講座のみ条件の記憶に欠けた基礎値を確認し、討論やクラスサイズの効果としては解釈しない
- **2026-08-22 — [v9b](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-08-22-self-review-v9b/):** 条件別得点は維持。討論参加者へ講義後の記憶が渡らず、各討論条件の独立反復も1本だったため、クラスサイズや討論の効果としては解釈できないと判断した
- **2026-08-15 — [v8](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-08-15-self-review-v8/):** 条件別順位は維持。自由記述0%が完全一致採点の産物で、最高得点の全体討論が独立した討論1本に依存していたと確認した
- **2026-08-09 — [v7a・v7b](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-08-09-self-review-v7a-v7b/):** 主数値は維持。強制的なやり取りと手順混乱タイプが意図どおり成立しておらず、教材と評価問題の重複も見つかった
- **2026-07-31 — [v6](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-31-self-review-v6/):** タイプ別の±25ポイントが各条件1名・8問中2問の差だったため、論文の実効nを訂正。v5のプロファイル注入の非対称性も追記した
- **2026-07-25 — [v5](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-25-self-review-v5/):** 個別指導の高得点を、誤概念修正ではなく必要な規則が記憶に残ったかという観点から説明し直した
- **2026-07-20 — [v4](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-20-self-review-v4/):** L3を「全条件0%」とした説明を訂正し、集団授業の高得点をBloom理論の反証とは扱わないと判断した

## 現在地

- 論文: 完成
- 日誌: 実験と論文化のベース日誌、実行データの公開判断、v1–v8とv9b・v9c・v9c2のセルフ査読を公開
- 研究上の問い: LLMエージェント環境でBloomの2シグマ効果は再現するか
- 結果: 7世代を通じて再現せず。v9c2では教育条件間差約10ポイント、学習者タイプ間差38.4ポイント。ただし、いずれも記述統計であり人間への一般化はできない
- 方法論上の成果: F1–F5の交絡分類とAコードの是正手順
- 現在の研究段階: セルフ査読中。v1–v8とv9b・v9c・v9c2を完了し、後続世代と世代横断監査を順次確認する
- 最終更新: 2026-09-05にv9c2を査読。v9cの記憶データ欠落と独立反復不足は改善したが、準備確認の例題重複と、比較基準の反復・学習量の非対称が残った。論文の準備確認とnullの表現は判断を保留した

## 開発日誌

- [v9c2を25分査読し、修正後の10ポイント差を「効果なし」と読まない](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-09-05-self-review-v9c2/)
- [v9cを30分査読し、37ポイント差を討論の効果と読まない](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-08-29-self-review-v9c/)
- [v9bを45分査読し、ルールを持たない討論をクラスサイズ効果と読まない](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-08-22-self-review-v9b/)
- [v8を50分査読し、自由記述0%と「4人分」の独立性を問い直す](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-08-15-self-review-v8/)
- [v7a・v7bを70分査読し、成立しない介入と学習者タイプを切り分ける](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-08-09-self-review-v7a-v7b/)
- [v6を30分査読し、±25ポイントの人数と学習者差の作り方を問い直す](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-31-self-review-v6/)
- [v5を30分査読し、個別指導の高得点を「必要なルールが記憶に残ったか」から説明し直す](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-25-self-review-v5/)
- [v4を25分で査読し、集団授業の高得点をBloom理論の反証と読まない](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-20-self-review-v4/)
- [v1–v3を80分かけて査読し、天井効果の説明を直す](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-19-self-review-v1-v3/)
- [セルフ査読の前に、実行データを公開対象へ戻す](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-14-include-run-data-before-self-review/)
- [7世代の負の結果から、交絡を監査するまで](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-04-seven-generation-negative-result/)

今後、論文を読み直して理解や評価が変わったときは、新しい日誌を追加してここへ新しい順にリンクします。

## 次に記録したいこと

- v9c2の準備確認90.3%と教材の例題重複を、論文と世代横断監査へどう反映するか
- v9c2の約10ポイント差を、「大きな効果を確認しなかった」以上に強く解釈していないか
- v9cの高い確信を示した誤答率12.9%への訂正が、v9c2分析文書の比較表と総合解釈に残っている問題
- v10以降で、主張から根拠へたどる査読（claim→evidence）
- 手順混乱の機構説明に依存する論文箇所の更新
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
- 著者によるv7a・v7bセルフ査読メモ（2026-08-09）
- 著者によるv8セルフ査読メモ（2026-08-15）
- 著者によるv9bセルフ査読メモ（2026-08-22）
- 著者によるv9cセルフ査読メモ（2026-08-29）
- 著者によるv9c2セルフ査読メモ（2026-09-05）
