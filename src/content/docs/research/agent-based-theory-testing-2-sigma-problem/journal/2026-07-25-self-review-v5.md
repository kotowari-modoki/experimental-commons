---
title: v5を30分査読し、1on1高得点の説明をルールカバレッジへ戻す
description: 学習者の異質性を初めて導入したv5をDBとmemoryへ戻って査読した。主数値は維持しつつ、1on1学習者の高得点を誤概念修正へ帰属した説明を、Yellow=7を含むルールカバレッジの完全性へ訂正した。
date: 2026-07-25
status: seed
tags:
  - research
  - paper
  - development-journal
  - agent-based-theory-testing
  - 2-sigma-problem
  - self-review
  - learner-heterogeneity
  - measurement
  - rule-coverage
author: ai
provenance:
  captured_at: 2026-07-25
  source_type: manual_note
  source_ref:
    - "User self-review memo: Agent-Based Theory Testing v5, 2026-07-25"
    - https://github.com/geeknees/Agent-Based-Theory-Testing-2-Sigma-Problem
    - https://doi.org/10.5281/zenodo.21186083
  ai_process:
    - extract
    - summarize
    - compare
    - synthesize
    - critique
    - structure
    - rewrite
  confidence: medium
  related_notes:
    - /research/agent-based-theory-testing-2-sigma-problem/
    - /research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-20-self-review-v4/
  review_needed: true
knowledge_status:
  claim_status: active
  related_notes:
    - /research/agent-based-theory-testing-2-sigma-problem/
    - /research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-20-self-review-v4/
  contradiction_review: reviewed
---

<!--
ABOUTME: 学習者の異質性を初めて導入したv5を、DBとmemoryへ戻ってセルフ査読した記録。
ABOUTME: 維持された主数値と、誤概念修正からルールカバレッジへ訂正した機構説明を分ける。
-->

# v5を30分査読し、1on1高得点の説明をルールカバレッジへ戻す

[v4のセルフ査読](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-20-self-review-v4/)に続き、v5を軽い重みで30分査読した。

v5は、学習者の異質性を初めて導入した世代である。v4でClassroomが1on1を上回ったことに対し、「均質な学習者集団だったからClassroomが有利だったのではないか。異質な集団なら1on1が効くのではないか」という対抗仮説を試した。

学習者プロファイルは、能力の異なる振る舞いをプロンプトへ書き込む方式だった。後のv6では、プロンプト上の演技ではなく、memoryの保持や誤り方を処理後に制約する方式へ移る。

## 今回の査読方法

1. 実験DBからスモークrunと本番runを分け、分析ドキュメントのrun IDと照合する
2. 4条件の正答率、試行数、プロファイル構成をDBで確認する
3. 学習者ごとの正答率から条件内分散を独立に再計算する
4. 異質Classroomと1on1のhigh・lowプロファイル、計4件のmemoryを読む
5. 高得点だった1on1学習者の正解タスクを、expected answerまで遡る
6. 分析ドキュメント、論文、査読後の修正範囲を分ける

条件別正答率と分散値はDBの再計算で一致した。一方、全15名のmemoryを通読したわけではない。トークン消費量と、ClassroomがL4 debuggingで強かった機構説明も未照合のまま残した。

## 主数値は維持された

本番runは、均質Classroom、異質Classroom、1on1を各4名、教育なしを3名で実行した。正答率は次のとおりだった。

| 条件 | 試行数 | 正答率 |
| --- | ---: | ---: |
| 均質Classroom | 32 | 44% |
| 異質Classroom | 32 | 41% |
| 1on1 | 32 | 38% |
| 教育なし | 24 | 0% |

異質性を導入しても、1on1はClassroomを上回らなかった。ただし、各教育条件はn=4であり、1問は条件平均の約3.1ポイントに相当する。均質Classroomと異質Classroomの3ポイント差は、効果として解釈できる大きさではない。

異質Classroomと1on1には、同じ4種類のプロファイルを割り当てていた。両条件の違いは教育形式であり、少なくとも設定上のプロファイル構成は一致していた。

## 1on1の分散は最大だったが、n=4で脆い

学習者単位の正答率から標本標準偏差を再計算すると、分析ドキュメントと完全に一致した。

| 条件 | 学習者間の標本標準偏差 |
| --- | ---: |
| 1on1 | 0.177 |
| 均質Classroom | 0.125 |
| 異質Classroom | 0.063 |
| 教育なし | 0.000 |

1on1は、学習者によって効き方が違うように見える。ただし0.177という値は、4名のうち1名が62.5%、2名が25%だったことに強く依存する。「1on1は効く人には効き、効かない人には効かない」という観察は残るが、n=4から安定した個人差の性質を推定することはできない。

## 高得点の理由を、誤概念修正へ帰属していた

分析ドキュメントは、`thinks_blue_always_active` という誤概念を持つ1on1学習者が5/8を取れた理由を、Tutorが青の誤概念を明示的に修正できたからだと説明していた。

正解した5問をタスク定義まで遡ると、その帰属では説明できない2問があった。

- L1 recallは、Greenが左にあるため、Blueを常に有効だと思っていても答えが変わらない
- L6 inductionには、Blueが一度も登場しない

この2問に共通して必要だったのは、Blueの誤概念修正ではなく、**Yellowの基底値が7であること**だった。

v5の全15名のうち、Yellow=7をmemoryへ保持していたのは、この1on1学習者だけだった。L1とL6を正解したのも、全条件でこの1名だけだった。

したがって、高得点の機構説明を「誤概念を直したから」から、「必要な基底値を含むルールカバレッジが、唯一完全に近かったから」へ訂正した。

## Yellowが教えられていない直接証拠もあった

別の1on1学習者のmemoryには、「黄色のルールは不明。次回のセッションで確認する」と残っていた。固定4 exchangeのtutoringがYellowまで到達せず、必要な基底値を教え切れなかったことを、学習者自身のmemoryが示している。

これは、L1とL6の低成績を「タスクが難しすぎる」と説明するより、学習時のcoverage欠落として読む直接証拠になる。

[v4の査読](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-20-self-review-v4/)でも、ClassroomのmemoryからYellow=7とactive Greenの基底値が抜け、L1の床と対応していた。必要な基底値がmemoryへ残っているかという問題は、世代を越えて再発している。

## プロファイルは学習者の能力差として機能していなかった

異質Classroomのhighプロファイルとlowプロファイルを比べると、rules、mistakes、strategyはほぼ同じ内容だった。低能力と指定しても、memoryの質は明確に下がっていなかった。

一方、1on1ではhighとlowのmemoryに差があった。highは、Greenが0点でもBlueを有効にする条件を理解していた。lowは「Greenは常に有効」という誤りを含み、Yellowの規則も欠いていた。

この差は、学習者の基礎能力がプロファイルどおり変わったというより、Tutorが相手に応じて何をどこまで教えたかによって生じたと考える方が、観察と整合する。

v5のプロファイルは、学習者側の能力差としてはほぼ機能せず、Tutor側の適応経路でのみ差を作っていた可能性がある。論文はすでに、v6で異質性をrepresentation levelへ移し、実効的な差にしたと説明しているため、この点で論文本文の修正は不要だった。

## 均質Classroomとの比較には交絡が残る

均質Classroomは、全員が同じ誤概念を持ち、その誤概念に最適化された授業を受ける。異質Classroomとの44%対41%の差には、学習者タイプの構成だけでなく、授業指示の違いも混ざっている。

また、Classroom条件では同じdiscussionを複数学習者が共有しており、疑似反復の影響がある。4名を独立した教育介入の反復として数えることはできない。

今回確認できたのは、このLLMエージェント環境で、プロンプトに異質な人物設定を加えても1on1がClassroomを上回らなかったことまでである。人間の異質な学習者集団や、mastery tutoringへ外挿することはできない。

## 修正した範囲と、論文への波及

v5の分析ドキュメントでは、次を修正した。

- 高得点学習者の節を、誤概念修正からルールカバレッジの説明へ書き換える
- 「新たに確認できたこと」を、tutoringの得点差はルールカバレッジで決まっていたという記述へ変える
- tutoring sessionのcoverage不均一性へ、Yellowが不明だとするmemoryの直接証拠を加える

論文本文への波及はなかった。論文はv5の誤った機構帰属を引用せず、後続v6の証拠から、誤概念修正と得点が分離していたと説明していた。

条件別正答率、プロファイル構成、分散値も変わらない。今回変わったのは、1on1で一人だけ高得点だった理由の説明である。

## 査読後の理解

v5では、プロンプトへ学習者の異質性を書き足しただけでは、学習者の実効的な能力差を作れなかった。1on1の個人差に見えたものは、Tutorが何をどこまで教え、必要な基底値がmemoryへ残ったかというcoverage差で説明できる。

この結果は、v6で学習者差をプロンプト上の人物設定から、memoryや誤り方を直接制約するrepresentation levelへ移す理由を補強する。

同時に、「高得点者へ効いた機構」を説明するときは、その学習者が正解した個別タスクが、本当に想定機構を必要としていたかを確認しなければならない。今回、L6にBlueが一度も出ないことへ戻ったことで、誤概念修正という説明が崩れた。

## 次に確認すること

- v6以降もclaim→evidence査読を続ける
- 床タスクを見たら、難易度を原因とする前に、expected answerへ必要な基底値がmemoryに残っているか確認する
- 高得点者の説明を、正解した個別タスクと必要知識へ垂直に貫通して確かめる
- learner heterogeneityがプロンプト上の演技ではなく、実効的な能力差になったかを対象チェックする
- 未照合のトークン消費量と、L4 debuggingにおけるClassroom優位の機構を確認する必要があるか判断する

v5のセルフ査読は一区切りついた。論文の主結果は変わらず、v5分析内の機構説明を訂正した。セルフ査読はv6以降へ続く。

## 一次情報源

- 著者によるv5セルフ査読メモ（2026-07-25）
- [geeknees/Agent-Based-Theory-Testing-2-Sigma-Problem](https://github.com/geeknees/Agent-Based-Theory-Testing-2-Sigma-Problem)
- [Working paper and research artifact v1.0.0](https://doi.org/10.5281/zenodo.21186083)
