---
title: v4を25分で査読し、Classroom優位をBloom反証と読まない
description: 最初の本番runで得たClassroom 47%、1on1 28%、教育なし0%をDBと生データへ戻って確認した。主数値は維持しつつ、床タスクの説明を訂正し、固定4 exchangeの1on1をmastery tutoringと同一視できない限界を記録する。
date: 2026-07-20
status: seed
tags:
  - research
  - paper
  - development-journal
  - agent-based-theory-testing
  - 2-sigma-problem
  - self-review
  - reproducibility
  - measurement
author: ai
provenance:
  captured_at: 2026-07-20
  source_type: manual_note
  source_ref:
    - "User self-review memo: Agent-Based Theory Testing v4, 2026-07-20"
    - https://github.com/geeknees/Agent-Based-Theory-Testing-2-Sigma-Problem
    - https://doi.org/10.5281/zenodo.21186083
  ai_process:
    - extract
    - summarize
    - synthesize
    - structure
    - rewrite
  confidence: medium
  related_notes:
    - /research/agent-based-theory-testing-2-sigma-problem/
    - /research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-19-self-review-v1-v3/
  review_needed: true
knowledge_status:
  claim_status: active
  related_notes:
    - /research/agent-based-theory-testing-2-sigma-problem/
    - /research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-19-self-review-v1-v3/
  contradiction_review: reviewed
---

<!--
ABOUTME: Agent-Based Theory Testingの最初の本番runであるv4を、DBと生データへ戻って査読した記録。
ABOUTME: 維持された主数値、訂正した床効果の説明、Bloom理論へ外挿できない限界を分けて残す。
-->

# v4を25分で査読し、Classroom優位をBloom反証と読まない

[v1–v3のセルフ査読](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-19-self-review-v1-v3/)に続き、最初の本番runであるv4を査読した。今回は軽い重みで25分かけ、主張と実行runの対応、主数値、1on1 tutoringの実装、タスク変更、床効果の説明を確認した。

v4は、Classroom、1on1、教育なしの3条件を初めて本番比較した世代である。1on1には、教授、診断質問、フィードバックと修正、再診断という4 exchange・8ターンのfeedback loopを導入した。

## 今回の査読方法

1. 実験DBから本番runを特定し、分析ドキュメントのrun IDと照合する
2. 条件別とタスク種別の正答率をDBから再計算する
3. 1on1のトランスクリプト1件を読み、4 exchange・8ターンの実装を確認する
4. Classroomのmemory 1件を読み、床タスクが解けなかった機構を確認する
5. 評価タスク設定と実装commitを確認する
6. 開発ログ、分析ドキュメント、論文の主張と突き合わせる

本番runの主数値とタスク別集計はDBで再計算し、分析ドキュメントと一致した。ただし、生データの目視は1on1とClassroomの各1件であり、全学習者を確認したわけではない。

## 主数値は維持された

本番runの正答率は、次のとおりだった。

| 条件 | 試行数 | 正答率 |
| --- | ---: | ---: |
| Classroom | 32 | 47% |
| 1on1 | 32 | 28% |
| 教育なし | 24 | 0% |

Classroomが1on1を上回り、教育なしは0%だったという分析ドキュメントの主張は、DBの再計算で確認できた。教育なしが0%だったことは、このrunでは評価時に学習memoryだけを使う設計が機能していたことと整合する。

一方、この順序だけから「Classroomが1on1 tutoringより優れている」と一般化することはできない。v4の1on1は4 exchangeで終了し、正解するまで教え続けるmastery criterionを持たない。Bloomが扱ったmastery tutoringと同じ介入ではなく、サンプルも小さい。さらに、Classroom条件では同一discussionを複数学習者が共有する疑似反復の影響があり、独立した観察数として数えることはできない。

したがって、v4はBloomの予測と逆向きの結果を示したが、Bloom理論を反証したとは言えない。今回維持されたのは、このLLMエージェント環境と実装条件における条件差である。

## feedback loopとタスク変更を確認した

実装と生のトランスクリプトを照合し、1on1 tutoringが次の4 exchange・8ターンで動いていたことを確認した。

1. 教授
2. 診断質問
3. フィードバックと修正
4. 再診断

また、v1–v3でドメイン知識を測れていなかったL5 counterexample問題は、v4でdebugging問題へ置き換えられていた。L6も短いルール帰納問題へ簡略化されていた。これは、初期パイロットで見つけた測定上の問題を最初の本番runへ反映した変更として確認できた。

## 床タスクの説明を訂正した

分析ドキュメントには、L1、L3、L6が「全条件0%」と書かれていた。しかし、タスク別集計ではL3 rule interactionをClassroomが1/4、25%正解していた。表は正しかったが、要約文が丸めすぎていた。

説明を次のように訂正した。

- L1とL6は全条件0%
- L3はほぼ0%だが、Classroomだけ1/4正解

主となる条件別正答率は変わらない。ただし、低成績タスクをまとめて「全条件0%」と扱うと、L3で起きたわずかな差まで消えてしまうため、観察値へ戻した。

## L1の床は、memoryに基底値が残らなかったことと対応していた

目視したClassroomのmemoryは、rules、mistakes、strategy、edge casesの4フィールドを持ち、形式上は整っていた。しかし、Yellowとactive Greenの基底値がrulesに残っていなかった。そのため、これらの値を必要とするL1 recall問題を解けなかったと考えられる。

目視した1on1トランスクリプトでも、学習者はactive Greenの値が分からないと二度述べていた。Tutorはその後のfeedbackで値を補っており、1on1ではTutor側が不足情報を修正できる構造も見えた。

この2件は、L1床効果とmemory形成の不完全さがつながる具体例である。ただし、各条件1件の観察なので、全学習者に同じ機構が働いたとまでは断定できない。

## まだ確認できなかったこと

開発ログには、レート制限への対応を含め、v4の完走に約21時間かかったとある。DBのrun作成時刻は約12時間に分散していたが、待機中には新しい行が作られない。DBの時刻だけでは総所要時間を検証できず、今回は未確認のまま残した。

また、L6が全条件0%だった一部には、後の監査で判明したexact-match scorerの影響がある。これは既存の交絡記録で扱われており、v4固有の新しい所見とはしなかった。

## 査読後の理解

v4は、評価問題と採点ルールを分離した状態で、3条件の差を初めて本番runとして観察した世代だった。主数値、feedback loop、タスク変更は資料間で一致していた。今回直したのは、L3まで全条件0%とした要約と、L1床効果の機構が抽象的だった点である。

予想外だったClassroom優位は、次の問いを生んだ。しかし、この結果を教育一般や人間の学習へ外挿する前に、固定4 exchange、mastery criterionの欠如、小さいサンプル、疑似反復という設計上の差を切り分ける必要がある。

## 次に確認すること

- v5以降もclaim→evidenceの照合を続ける
- Classroom優位が、共有discussion、memory形成、Tutorの構成、試行数のどれに由来するか切り分ける
- mastery criterionを持たないv4の1on1と、Bloomのmastery tutoringの違いを論文全体で一貫して説明できているか確認する
- 床タスクを0%という結果だけでまとめず、タスク設計、memory、scorerを分けて確認する
- 約21時間という開発ログ上の所要時間を検証する必要があるか判断する

v4の査読は一区切りついた。セルフ査読はv5以降へ続く。

## 一次情報源

- 著者によるv4セルフ査読メモ（2026-07-20）
- [geeknees/Agent-Based-Theory-Testing-2-Sigma-Problem](https://github.com/geeknees/Agent-Based-Theory-Testing-2-Sigma-Problem)
- [Working paper and research artifact v1.0.0](https://doi.org/10.5281/zenodo.21186083)
