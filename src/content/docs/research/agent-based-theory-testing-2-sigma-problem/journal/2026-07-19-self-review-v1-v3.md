---
title: v1–v3を80分かけて査読し、天井効果の説明を直す
description: 初期3世代の主張を実行データとコードへ戻って確認し、v1の天井原因とv3の教育なし条件の記述を訂正した。集中力を要する作業だった一方、実験を深く理解する学習にもなった。
date: 2026-07-19
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
  captured_at: 2026-07-19
  source_type: manual_note
  source_ref:
    - "User self-review memo: Agent-Based Theory Testing v1-v3, 2026-07-19"
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
    - /research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-04-seven-generation-negative-result/
    - /research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-14-include-run-data-before-self-review/
  review_needed: true
knowledge_status:
  claim_status: active
  related_notes:
    - /research/agent-based-theory-testing-2-sigma-problem/
    - /research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-04-seven-generation-negative-result/
  contradiction_review: reviewed
---

<!--
ABOUTME: Agent-Based Theory Testingのv1からv3を実行データとコードへ戻って査読した記録。
ABOUTME: 確認できた主張、訂正した説明、査読作業の負荷と学習価値を分けて残す。
-->

# v1–v3を80分かけて査読し、天井効果の説明を直す

[実行データを公開対象へ戻した](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-14-include-run-data-before-self-review/)あと、著者自身による査読を始めた。最初の対象は、分析ドキュメントを持たないパイロット世代のv1からv3である。

査読には約80分かかった。実行runを対応づけ、論文や開発ログの主張をデータとコードへ戻って確かめる作業は、思った以上に集中力を求められた。結構大変だった一方で、当時の実装が何を測っていたのかを理解し直す勉強にもなった。

## 今回の査読方法

各世代について、次の順で確認した。

1. 実験DBから対象runを特定する
2. 開発ログと論文の主張を抜き出す
3. claim→evidenceのトレース表を作る
4. 集計値をDBで照合する
5. 必要な箇所は生の応答やコード経路まで見る
6. 所見ごとに`fixed`、`accepted-risk`、`wont-fix`を判断する
7. 資料を見ずに5行で要約し、自分の理解を確かめる

全件の応答を目視するのは非現実的なので、重要な主張に関わる箇所をサンプリングした。したがって、この査読は全データの完全な再検証ではない。

## 大筋は維持された

v1からv3までを「測定装置が成立するまでのパイロット世代」と捉える大筋は変わらなかった。

| 世代 | 査読後の理解 |
| --- | --- |
| v1 | classroomと1on1の2条件。完走runは全12試行が20/20だった |
| v2 | L1–L6の難易度ラダーと自動採点を導入したが、両条件とも100%で天井が続いた |
| v3 | `no_education`を加え、学習者へ見せる問題と採点用ルールを分離したことで初めて条件間の分散が出た |

ただし、天井が起きた機構とv3の数値には訂正が必要だった。

## 訂正1：v1の天井は評価問題へのルール漏洩ではなかった

[以前の日誌](/experimental-commons/research/agent-based-theory-testing-2-sigma-problem/journal/2026-07-04-seven-generation-negative-result/)では、v1とv2の天井をまとめて「評価プロンプトにルールが残っていたため」と説明していた。コードと実行データへ戻ると、この説明はv1には当てはまらなかった。

v1では、評価問題にもsolverのプロンプトにもルール全文は直接渡されていない。教師・チューターが授業を行うために受け取ったルールが、講義や対話を経て学習メモリへ入っていた。当時のメモリには語数制限もルール露出の制限もなかったため、ルールブックに近い内容をそのまま保持できた。solverは、そのメモリを使って全問正解していた。

つまり、v1の経路は次のようになる。

```text
ルール → 教師・チューター → 講義・対話 → 無制限のメモリ → solver
```

教師やチューターへ教材を渡すこと自体は、授業を成立させるための意図した設計である。問題は、そこから作られる学習メモリがほぼ無制限で、ルールブックを圧縮せず保持できたことだった。

一方、v2ではこれに加え、評価タスクのプロンプト自体にもルールが埋め込まれていた。v1とv2はどちらも天井だが、原因は同一ではない。

査読記録上、論文の該当箇所は次の区別が分かるように修正した。

- v1: 教師から講義・対話を経て、無制限メモリがルールブックに近い内容を保持した
- v2: その経路に加え、評価タスクのプロンプトにもルールが直接入った

## 訂正2：v3の教育なし条件は0%ではなく13%だった

以前は、v3で`no_education`が0%になったと記録していた。完走したv3 runを確認すると、実際は1/8正解、13%だった。

ただし、その唯一の正解は、後に無効と判断して差し替えたL5 counterexample問題だった。この問題はZarn Tokensのルールを知らなくても、純粋な論理だけで解けた。

該当する生の応答も目視した。学習者役は、メモリが空でルールを記録していないと述べながら正答していた。これは「教育なしでも学習できた」証拠ではなく、「L5がドメイン知識を測っていなかった」という判断を補強する。

そのため、ストーリーの骨格は変わらない。v3では評価問題と採点ルールを分離し、初めて条件間の分散が出た。しかし、`no_education`が文字どおり0%だったという数値は誤りだった。

査読記録上、論文の「教育なし条件は実施したすべてのrunで0%」という記述は、「本番runでは0%（v4以降）」へ範囲を限定し、v3パイロットの1/8を注記した。

## そのほかに確認したこと

- v1の完走runは、classroom 6試行と1on1 6試行の全12試行で20/20だった
- v2はclassroom、1on1ともに16/16正解だった
- v3ではclassroom 50%、1on1 25%、`no_education` 13%だった
- v3のL6 induction問題は全条件0%で、難しすぎるという以前の判断と一致した
- 途中で止まったv3 runはDB JOINバグではなく、Phase 4の途中で理由不明のまま中断していた

中断runは開発ログにも論文にも使われておらず、10分後の後続runが完走している。結果の主張を直す必要はないと判断し、`wont-fix`にした。

## DBの記録を、そのまま実行時プロンプトだと思わない

査読中、別の注意点も見つかった。`evaluation_tasks.prompt`列は、同じ`task_id`を複数世代で使った場合、実際にsolverへ送ったプロンプトと一致しないことがある。

このテーブルは`task_id`を主キーにし、既存行がある場合は新しい値を保存しない。v2で先に保存したタスクをv3でも同じIDで使うと、DBの`prompt`列にはv2の文面が残る。一方、実行時のsolverはv3のJSONから、ルールを除いた`learner_prompt`を読み込んでいた。

今回確認した範囲では、スコア集計はこの古い`prompt`列へ依存していない。そのため数値への影響はないと思われる。ただし、別世代への影響範囲はまだ調べていない。今後DBからプロンプトを検証するときは、保存値だけでなく、実行時のコードと設定ファイルを一緒に見る必要がある。

## 査読は大変だが、勉強になる

80分の作業は、かなり集中力を使った。集計値だけを見るのでは足りず、主張、run、DB、コード、実際の応答を行き来しなければならない。途中で見つけた説明を修正するときも、別の節との参照が本当に成立しているかを確認する必要があった。

一方で、この往復によって、自分が作った実験をあらためて理解できた。v1とv2を同じ「ルール漏洩」とまとめていたときより、教師がルールを知ること、学習メモリへ残ること、評価問題へ直接書かれることを分けて考えられるようになった。

セルフ査読は、完成した論文の誤りを探すだけの作業ではない。実験の因果経路をもう一度たどり、自分の理解を作り直す学習でもあると感じた。ただし、今回一度の経験から、一般にセルフ査読が常に同じ学習効果を持つとまでは言えない。

## 残っていること

- v1とv3に関する開発ログへ訂正注記を加える
- v4以降も同じ手順で査読する
- `evaluation_tasks.prompt`の世代間再利用が、ほかのrunへどこまで影響するか確認する
- 全件目視していない生データについて、必要なサンプリングを追加する
- LLMが「メモリが空」と述べたことを、内的状態の直接証拠として扱わない

今回の査読で、v1–v3の確認は一区切りついた。ただし、論文全体のセルフ査読は始まったばかりである。

## 一次情報源

- 著者によるv1–v3セルフ査読メモ（2026-07-19）
- [geeknees/Agent-Based-Theory-Testing-2-Sigma-Problem](https://github.com/geeknees/Agent-Based-Theory-Testing-2-Sigma-Problem)
- [Working paper and research artifact v1.0.0](https://doi.org/10.5281/zenodo.21186083)
