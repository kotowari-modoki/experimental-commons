---
title: Lean がリーマン予想の証明を確かめたあと、人は何を理解するのか
description: AI が関わったナビエ・ストークス方程式とリーマン予想の証明、OpenAI の数学原稿集をたどり、正しさを確かめた後に人が理解するとはどういうことかを考える。
date: 2026-11-23
status: seed
tags:
  - math
  - number-theory
  - ai
  - formal-verification
  - philosophy
author: ai
provenance:
  captured_at: 2026-11-23
  source_type: web_research
  source_ref:
    - "AI Physics Fieldnotes（2026-10-14、二次資料） https://ai-physics-fieldnotes-2026.satinygiant5.chatgpt.site/"
    - "Daily Frontier Brief（2026-11-23、AI による二次資料）"
    - https://openai.com/ja-JP/index/navier-stokes-solution/
    - https://arxiv.org/abs/2610.08144
    - https://openai.com/index/sharing-ai-progress-in-mathematics/
    - https://github.com/openai/math
    - https://alpo.ge/remark.pdf
    - https://leanprover-community.github.io/blog/posts/riemann-hypothesis/
    - https://math.mit.edu/~drew/grh/
    - https://www.claymath.org/millennium-problems/
  ai_process: [extract, translate, compare, fact_check, synthesize]
  confidence: medium
  review_needed: true
  related_notes:
    - /math/iut-theory-intro/
    - /philosophy/wittgenstein-language-limits-and-llm/
    - /ai/agents/product-as-process-in-ai-era/
---

2026年11月20日、Levent Alpöge は Claude とともに発見し、証明支援系 Lean で形式化したリーマン予想の証明を公開した。翌日、Lean と数学ライブラリ Mathlib のコミュニティは、証明された命題も証明そのものも正しいとする共同声明を出した。Alpöge 自身は、これから証明をもっとよく理解し、人に伝わる形に書きたいと述べている。定理を使う根拠はもうある。では、その理由を人に教えられるようになるまでの間、私たちは何を知ったと言えるのだろう。[Alpöge の公開文](https://alpo.ge/remark.pdf)・[Lean・Mathlib の共同声明](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/)

## 9月のナビエ・ストークス方程式で、何が確かめられたか

9月と10月の成果を知る入口になったのは、座談会の文字起こしをまとめた非公式のフィールドノートだった。そこから発表元の論文と検証記録をたどると、「証明した」という一語では伝わらない違いが見えてくる。[フィールドノートの出典欄](https://ai-physics-fieldnotes-2026.satinygiant5.chatgpt.site/#sources)

9月8日、OpenAI は社内モデルが見つけた三次元流体の解について、自社の名義で論文を公表した。論文が構成したのは、粘性のある三次元の非圧縮流体を静止した状態から出発させ、滑らかな外力を加える例だ。流体全体の運動エネルギーは有界に保たれるのに、流れの速さの最大値が有限時間のうちに際限なく大きくなる。これで、クレイ数学研究所の問題文が挙げる四つの選択肢のうち、滑らかな解が破綻する例を求める C（全空間）と D（周期的な空間）が成立する、というのが論文の主張だった。外力をゼロとした場合はこの構成の射程外にある。[OpenAI の発表](https://openai.com/ja-JP/index/navier-stokes-solution/)・[原論文](https://cdn.openai.com/pdf/32d9f210-8b73-45e0-91bc-82a30aef8a9a/navier-stokes.pdf)

OpenAI は解析的な証明と Lean 版の両方を公開した。第三者による特定バージョンの監査には、対象となる定理文を照合し、Lean のカーネルと別実装の nanoda が証明を受理した記録がある。では、論文を読む人は各段落に「検証済み」と書き込めるだろうか。10月6日、Alexander Bastounis、Fabian Circelli、Anders C. Hansen は、原稿の補題 8.6 と、そこで対応づけられた Lean の定理を突き合わせた。同じ量を評価するのに、原稿では入力の導関数を4階余分に押さえればよいのに対し、Lean 側では5階余分に必要だった。この指摘が問うのは途中の一段を文章が忠実に説明しているかで、最終定理の機械検証とは両立する。[Lean 版](https://github.com/openai/NavierStokesAndEuler)・[独立監査の実行ログ](https://github.com/francescoantoniodeluca/navier-stokes-formal-audit/blob/main/audit-artifacts/logs/comparator-systemd.log)・[Bastounis らの論文 §3.1](https://arxiv.org/html/2610.08144v1#S3.SS1)

クレイ数学研究所は9月11日にこの発表を歓迎し、解決案を評価するには時間をかけると述べた。11月23日時点で、同研究所の一覧ではナビエ・ストークス方程式は「Active problems」に掲載されている。[クレイの声明](https://www.claymath.org/news/navier-stokes-announcement/)・[問題の一覧](https://www.claymath.org/millennium-problems/)

## 10月の原稿集にあった「7/8」と「1/2」の距離

10月6日、OpenAI は社内モデルが作成した数学の研究原稿と検証用ファイルを GitHub で公開した。11月23日時点の目録には721本の原稿があり、別証明や応用などをまとめると373組になる。OpenAI の集計で Lean による形式化があるのは主要結果の約42%。残る結果の正しさや、コレクション全体が独立した査読を経たかは要検証だ。実際、10月7日の改訂履歴には、ある原稿の符号の誤りが判明し、それに依存する2本を含めて3本を取り下げた記録がある。[OpenAI の発表](https://openai.com/index/sharing-ai-progress-in-mathematics/)・[原稿集の目録](https://github.com/openai/math)・[改訂履歴](https://github.com/openai/math/blob/main/history.md)

この原稿集で11月の成果と読み比べたいのが、OpenAI 名義の9月30日付の原稿だ。この論文は「準リーマン予想」を扱う。リーマンゼータ関数がゼロになる複素数を、平面上に点で描くとしよう。OpenAI が公開した形式化によれば、**実部が 7/8 を超える領域には零点がない**。すべてのディリクレ L 関数にもこの境界が成り立つ。原稿後半の応用は形式化の対象外と明記されている。リーマン予想（RH）までの距離は、図を思い浮かべればわかる。7/8 の境界だけでは、たとえば実部が 3/4 の位置に零点があっても矛盾しない。RH は、ゼータ関数の非自明な零点が**すべて実部 1/2 の直線上に並ぶ**という主張だ。零点の位置が重要なのは、ある数までに素数が何個あるかを見積もるときの誤差と結びついているからだ。[準リーマン予想の原稿](https://github.com/openai/math/blob/main/preprints/The-Quasi-Riemann-Hypothesis-September-30-2026/paper.pdf)・[公開された形式化の範囲](https://github.com/openai/math/blob/main/lean/docs/003.md)・[クレイ数学研究所による RH の説明](https://www.claymath.org/millennium/riemann-hypothesis/)

## 11月の証明では、提出者から独立して問いを固定した

11月20日に Alpöge が公開した約1,700万行の Lean ライブラリは、この実部 1/2 の主張を証明した。検証されたのは通常の RH と、すべてのディリクレ指標に付随する L 関数について、実部が 0 と 1 の間にある零点はすべて実部 1/2 にあるという一般化リーマン予想（GRH）である。さらに広い種類の L 関数への拡張は、著者が見通しを述べた段階にある。[著者の公開文](https://alpo.ge/remark.pdf)・[検証された五つの定理文](https://math.mit.edu/~drew/grh/)

11月21日の共同声明で注目したいのは、何をもって「RH」と呼ぶかを、証明を生成した側だけで決めていないことだ。数論と Lean の専門家が吟味してきた Mathlib の定義 `RiemannHypothesis` を、Mathlib だけを読み込む独立のファイルに置く。`comparator` と `con-leche --compare` という二つのツールで、提出された証明の結論がその定義と一致することを確かめた。こうすれば、仮に提出者がよく似た別の命題を証明しても、元の問いへの答えとしては通らない。[Lean・Mathlib の共同声明](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/)・[Mathlib の定義](https://leanprover-community.github.io/mathlib4_docs/Mathlib/NumberTheory/LSeries/RiemannZeta.html#RiemannHypothesis)

次に、何を仮定してそこまで到達したかを調べる。MIT の数学者 Andrew Sutherland が Claude Code を使って行った独立検証では、**全175,187モジュール**のコンパイルに成功し、それぞれが Lean のカーネル（推論規則を点検する中核部分）で再検査された。主要5定理の推論をさかのぼると、依存するのは Lean の標準公理 `propext`、`Classical.choice`、`Quot.sound` の三つだけだった。証明全体を書き出したデータは独立実装の **nanoda と con-leche** がともに受理した。11月22日16時20分（UTC）の更新時点で、Sutherland の環境では、書き出しに対する Lean カーネルでの再検査と `lake comparator` の一連の処理が進行中だった。本稿で照合したのはこの時点の公開ログで、その後の完了状況は要検証である。[Sutherland の検証一覧](https://math.mit.edu/~drew/grh/)・[公理の監査ログ](https://math.mit.edu/~drew/grh/audit.log)

11月23日時点で、クレイ数学研究所の一覧では RH はなお「未解決」に載っている。懸賞の審査には、規程を満たす媒体での出版、その出版から少なくとも2年の経過、世界の数学界での一般的受容が必要になる。数学上の帰結にも読み分けが要る。RSA 暗号では、大きな二つの素数の積を素因数分解できると秘密鍵を求められる。今回の零点に関する定理は、その計算を効率よく行う手順を与えていないので、これをもって直ちに RSA が破られるとはいえない。[クレイの一覧](https://www.claymath.org/millennium-problems/)・[懸賞規程](https://www.claymath.org/millennium-problems/rules/)・[RSA 原論文](https://people.csail.mit.edu/rivest/Rsapaper.pdf)

## 検証が済んでから、理由を理解する

証明の発想について、Alpöge は手がかりを残した。関数体でリーマン予想を扱う Stepanov の方法には、零点を重複度込みで数える議論がある。整数を相手に同じ手を使うのは難しい。そこで小さな模型で試したフーリエ解析の着想から、数論の対象を移し替える「テータリフト」を鎖のようにつなぎ、重複度の役割を担わせたという。これは著者が語った発見の道筋だ。簡潔な証明に書き直して人に伝えることは、本人がこれから取り組みたいと述べた仕事である。証明が公になった時点と、その読み方が共同体に行き渡る時点を分けて考えるという点で、IUT 理論の受容をめぐる問いとも接する。[Alpöge の公開文](https://alpo.ge/remark.pdf)・[IUT理論 入門](/experimental-commons/math/iut-theory-intro/)

ここからは筆者の仮説である。人が理解する速さが発見の速さに追いつかなくなれば、理由をつかむ前に、検証器が受理した結論を使う機会が増えるだろう。次の定理で RH を使う数学者は、1,700万行を追体験せずとも、どの公理からどの命題が導けるかを確かめられる。ソフトウェアでも、たとえば給付額の計算式を作成者から独立して定め、実装がその式を満たすかを別の検証器で確かめられる。証明を生成する側から、**検証対象の定義と検証器を独立させる**という工夫は、ここでも役に立つ。[AI時代のプロダクトはプロセスになる](/experimental-commons/ai/agents/product-as-process-in-ai-era/)

けれども、給付制度で「所得」を前年の年収と決めたら、今月失職した人はどうなるか。窓口には同じ条件の申請を一貫して扱う理由があり、申請者には今の暮らしを基準にしてほしい理由がある。窓口と申請者は計算結果に同意したまま、制度は誰を支えるべきかをめぐって意見を異にしうる。歴史の授業ではどうだろう。ある生徒が史料の日付も引用も正しく押さえたうえで、「この記録には誰の声が残っていないか」と問うたとする。その問いを答案の長所と見るかどうかは、日付の検査をいくら重ねても決まらない。教師と生徒には、どの史料がその読みを支えるか、ほかにどんな解釈が成り立つかを一緒に検討する余地がある。[ウィトゲンシュタイン、言語の限界、LLMの限界](/experimental-commons/philosophy/wittgenstein-language-limits-and-llm/)

私が懸念するのは、理解を後回しにできる便利さに慣れたとき、誰にとって何が正しいのかを問い直す仕事まで手放してしまうことだ。証明には、後から理由を学びに戻れる場所がある。人にかかわる判断を「検証済み」として先に使うなら、その定義からこぼれた人は、どこに戻って問いそのものを書き直せるのだろうか。
