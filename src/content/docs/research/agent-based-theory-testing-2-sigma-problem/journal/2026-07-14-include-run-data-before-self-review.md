---
title: セルフ査読の前に、実行データを公開対象へ戻す
description: 自分で十分に確認しきれないため外していた実行データを、AIによる内容確認と再現性の観点から公開対象へ含めると決めた記録。
date: 2026-07-14
status: growing
tags:
  - research
  - paper
  - development-journal
  - agent-based-theory-testing
  - 2-sigma-problem
  - self-review
  - research-data
  - reproducibility
  - sqlite
author: ai
provenance:
  captured_at: 2026-07-14
  source_type: personal_experience
  source_ref:
    - "User retrospective: pre-self-review decision to include run data, 2026-07-14"
    - https://github.com/geeknees/Agent-Based-Theory-Testing-2-Sigma-Problem
  ai_process:
    - extract
    - synthesize
    - structure
    - rewrite
  confidence: high
  related_notes:
    - /research/agent-based-theory-testing-2-sigma-problem/
    - /research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-04-seven-generation-negative-result/
  review_needed: true
knowledge_status:
  claim_status: active
  related_notes:
    - /research/agent-based-theory-testing-2-sigma-problem/
  contradiction_review: none
---

<!--
ABOUTME: Agent-Based Theory Testing論文のセルフ査読前に実行データの公開範囲を見直した判断を記録する。
ABOUTME: AIによる確認の限界と、一件のデータ紛失を含む再現性上の欠落を明示する。
-->

# セルフ査読の前に、実行データを公開対象へ戻す

`Agent-Based-Theory-Testing-2-Sigma-Problem`のセルフ査読へ入る前に、公開する研究成果物の範囲を確認していました。

当初は、実験の実行データを公開対象へ入れないつもりでした。自分で内容を十分に確認しきれないものを、そのまま外へ出してよいのか判断できなかったためです。

## AIからは、含めたほうがよいと言われた

確認の途中でAIから、実行データも公開範囲へ含めたほうがよいという助言がありました。

論文には結果の要約がありますが、実行データがあれば、第三者が報告値の由来をたどり、分析や実験条件を確認できる範囲が広がります。負の結果と交絡監査を主な成果とする今回の論文では、完成した文章だけでなく、判断の根拠へ戻れることにも意味があります。

助言には納得できる部分がありました。一方で、確認しきれていないデータを公開する不安は残りました。

## AIを使って内容を確認する

そこで、実行データをAIに確認させました。内容上の明らかな問題がないかを調べ、概ね問題ないという結果でした。

この確認を受け、実行データを公開対象へ含めることにしました。

ただし、AIによる確認は安全性や完全性の保証ではありません。今回できたのは、公開判断を助けるためのスクリーニングです。セルフ査読では、論文の主張と公開データが対応しているか、説明が足りない箇所はないかをあらためて確認します。

## 公開形式としてのSQLite

実行データの公開にはSQLiteが便利です。複数のテーブルとその関係を一つのファイルへまとめられ、受け取った側はSQLで必要な記録を取り出せます。テキストファイルの束より、実験単位やエージェント、評価結果の対応も保ちやすくなります。

その代わり、GitHubの画面では中身をそのまま読めません。確認する人はファイルを取得し、SQLiteを扱えるツールで開く必要があります。今回「見えにくいデータを公開対象に含めるか」で迷った背景には、この性質もあります。

また、実験中の保存先として使う場合は、複数のエージェントやプロセスによる同時書き込みへ対処しなければなりません。SQLiteは書き込み時にロックを取るため、busy timeout、リトライ、書き込みの直列化などの制御が必要です。

実行時にはロック制御が要る。一方、実験終了後のデータを単一ファイルで配布する用途には向いている。収集時と公開時を分けると、SQLiteの利点と注意点を整理しやすくなります。

## 一件のデータを紛失している

実行データのうち、一件は紛失してしまいました。

存在しないデータを後から再構成し、元の実行結果であるように扱うことはできません。今回は欠落として明示し、残っているデータを公開対象へ含めます。

すべてが揃っていないのは残念ですが、ここはやむを得ません。完全な再現パッケージであるように見せず、何が残り、何が失われたかを区別することを優先します。

## 今回の判断

- 当初は、自分で十分に確認しきれないため実行データを公開対象から外していた
- AIから、検証可能性のために含めたほうがよいと助言された
- AIを使って内容を確認し、概ね問題ないと判断した
- 実行データを公開対象へ含めることにした
- SQLiteは同時書き込みのロック制御が必要だが、実行データの配布には使いやすい
- 紛失した一件は、欠落として明示する
- AIによる確認だけで公開データの安全性や完全性が保証されたとは考えない

## セルフ査読で確認すること

- 論文に記載した数値と、残っている実行データが対応しているか
- 公開データだけで追えない判断や処理を説明できているか
- 紛失した一件が、どの主張の検証可能性に影響するか
- AIによる事前確認で見落とした問題がないか
- 公開範囲に含めるべきでない情報が残っていないか

今回の見直しは、セルフ査読そのものではなく、その前段階です。論文を読み直す前に、第三者がどこまで根拠へ戻れる状態にするかを決めました。

## 関連する開発日誌

- [7世代の負の結果から、交絡を監査するまで](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-04-seven-generation-negative-result/)
