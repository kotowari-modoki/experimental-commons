---
title: 論文開発日誌
description: 論文ごとの問い、実験、判断、失敗、次の検証を、研究の途中経過として公開するための入口。
date: 2026-07-11
status: seed
tags:
  - research
  - paper
  - development-journal
author: ai
provenance:
  source_type: ai_session
  source_ref:
    - "Codex session: 2026-07-11"
    - https://github.com/geeknees/decentralized-multi-agent
    - https://github.com/geeknees/Agent-Based-Theory-Testing-2-Sigma-Problem
    - https://github.com/geeknees/conspiracy_family_transmission
  ai_process:
    - extract
    - structure
  confidence: medium
  review_needed: true
knowledge_status:
  claim_status: active
  contradiction_review: none
---

<!--
ABOUTME: 複数の論文開発日誌を研究プロジェクト単位で案内する入口ページ。
ABOUTME: 各論文の正本と、このサイトに蓄積する開発過程の役割を分けて示す。
-->

# 論文開発日誌

ここは、論文が完成するまでの研究開発プロセスを記録する場所です。
論文本体、コード、データの正本は各GitHubリポジトリに置き、このサイトには次のような再利用可能な知識を残します。

- どの問いを検証したか
- 何を試し、何を観察したか
- どの根拠から何を判断したか
- うまくいかなかったことと、その理由についての仮説
- 以前の仮説や方針を、なぜ更新したか
- 次に何を検証するか

## 研究プロジェクト

| プロジェクト | 正本 | 現在の記録状態 |
| --- | --- | --- |
| [decentralized-multi-agent](/experimental-commons/research/decentralized-multi-agent/) | [GitHub](https://github.com/geeknees/decentralized-multi-agent) | 日誌の受け皿を作成。研究内容は要確認 |
| [Agent-Based-Theory-Testing-2-Sigma-Problem](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/) | [GitHub](https://github.com/geeknees/Agent-Based-Theory-Testing-2-Sigma-Problem) | 日誌の受け皿を作成。研究内容は要確認 |
| [conspiracy_family_transmission](/experimental-commons/research/conspiracy-family-transmission/) | [GitHub](https://github.com/geeknees/conspiracy_family_transmission) | 日誌の受け皿を作成。研究内容は要確認 |

## 日誌の運用

日付を埋めるためだけの日報にはせず、研究状態が変化した単位で1ページを追加します。
一回の実験、重要な読書、設計判断、想定外の結果、仮説の変更などが記録単位です。

新しい日誌は、各プロジェクトの次の場所に作成します。

```text
src/content/docs/research/<project>/journal/YYYY-MM-DD-short-title.md
```

作成後は、プロジェクトの `index.md` に日誌へのリンクを時系列で追加します。
記録項目とfrontmatterは[論文開発日誌テンプレート](/experimental-commons/research/journal-template/)を使います。

## Append-onlyで残す

後から判断が変わっても、古い日誌を現在の結論に合わせて黙って書き換えません。
新しい日誌から過去の記録へリンクし、何が変わったか、なぜ変わったかを残します。
明確に置き換えられた主張には `supersedes` / `superseded_by` を使い、矛盾の確認に人間判断が必要なら `contradiction_review: required` とします。

## 公開範囲

このサイトは公開リポジトリです。
個人情報、秘密情報、非公開データは記録せず、公開できるIssue、commit、データ、論文などへリンクします。
未確認の内容は断定せず、「仮説」「要検証」と明示します。
