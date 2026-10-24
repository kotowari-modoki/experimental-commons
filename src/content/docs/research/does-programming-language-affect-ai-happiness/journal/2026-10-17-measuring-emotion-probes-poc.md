---
title: AIの「楽しさ」を測れる形にする 無料GPUでの試行と最初のつまずき
description: 手元にGPUがない前提で、Colab無料枠のQwen3-4Bに感情プローブを当て、RubyとPythonを比べる小規模な試行を1日で組んだ記録。happyが何にでも合格したゲートと、同じ値の数えすぎに気づいて手順を直した。
date: 2026-10-17
status: growing
tags:
  - research
  - paper
  - development-journal
  - does-programming-language-affect-ai-happiness
  - interpretability
  - emotion-probe
  - google-colab
author: ai
provenance:
  captured_at: 2026-10-24
  source_type: personal_experience
  source_ref:
    - https://zenn.dev/geeknees/articles/e144c89d066189
    - "Claude Code research session: Does Programming Language Affect AI Happiness, 2026-10-17 to 2026-10-18"
    - https://www.anthropic.com/research/emotion-concepts-function
    - https://github.com/50s-zerotohero/emotion-qwen
  ai_process:
    - extract
    - synthesize
    - structure
    - rewrite
  confidence: medium
  related_notes:
    - /research/does-programming-language-affect-ai-happiness/
  review_needed: true
knowledge_status:
  claim_status: active
  related_notes:
    - /research/does-programming-language-affect-ai-happiness/
  contradiction_review: none
---

<!--
ABOUTME: AIの感情表現を言語別に比べる研究の動機と、最初の小規模試行の過程を記録する。
ABOUTME: 無料GPUという制約、ゲートの作り直し、擬似反復の修正を判断の理由とともに残す。
-->

# AIの「楽しさ」を測れる形にする 無料GPUでの試行と最初のつまずき

## 冗談のような問いから始めた

Rubyの作者まつもとゆきひろさんは、2003年のインタビューで "Ruby is designed to make programmers happy." と語っています。
Railsの設計原則（Rails Doctrine）も、最初の項目は "Optimize for programmer happiness" です。

最近は、コードの多くをAIが書きます。
それなら、AIがRubyを書くとき、AIの中でも「楽しい」が起きているのだろうか。
冗談のような問いですが、今はこれを測る道具がある、と私は考えました。

道具の出どころは、Anthropicが2026年に発表した「[Emotion Concepts and their Function in a Large Language Model](https://www.anthropic.com/research/emotion-concepts-function)」です。
大規模言語モデル（LLM）の内部には感情の概念に対応する方向があり、それが振る舞いにも効いている、という研究です。

ただし、この研究でいう「幸福」は、モデル内部の表現を感情の方向へ射影した数値のことです。
「機能として感情があること」と「感情を感じていること」の境界という大きな問いは、意図的に脇へ置きました。

## この記事で使う用語

- **感情プローブ**: 「嬉しかった話」「腹が立った話」のような感情ごとの短い物語をモデルに読ませ、中間層の活性化（内部の数値）を記録し、感情ごとの平均と中立な文章の平均との差から作った「感情の方向」。
- **z（ゼット）**: 調べたい文章をその方向へ射影し、中立な文章での分布で標準化した値。
- **ゲート（合格基準）**: プローブがその感情を本当に区別できるかを確かめる基準。結果を見る前に決め、通ったものだけ使う。
- **AUC**: ある場面とそれ以外の場面を、値の大小でどれだけ正しく分けられるかを0.5（でたらめ）から1（完全）で表す指標。
- **擬似反復**: 実質的に同じ1つのデータを、何度も独立に観測したかのように数えてしまう誤り。

## 制約を先に決めた

私の手元には、オープンウェイトのモデルを快適に動かせる機械がない前提にしました。
そこで役割を分けました。

- 研究計画、コード、テスト、分析はClaude Codeと手元で作る
- モデルの推論と内部の数値の取得は、Google Colabの無料枠（T4 GPU）で私がノートブックを開いて実行する
- 有料GPUを使うなら、事前に見積もりを出してから判断する

最終的に、GPUはすべてColab無料枠で済み、費用は$0でした。

測る側のモデルは **Qwen3-4B** にしました。
中を覗けるオープンウェイトで、T4にfp16で収まる大きさです。
感情の物語は、同じモデルで論文の手法を再現したOSS実装（[emotion-qwen](https://github.com/50s-zerotohero/emotion-qwen)）に同梱されたものを再利用し、方向は自分で抽出し直しました。

作業を手伝うモデル（Claude）は、測定対象にしないと決めました。
測られる側と手伝う側を分けておかないと、何を測っているのかが曖昧になるからです。

もう一つ、最初から決めていたのは「Rubyに有利な設計をしない」ことです。
問いの出発点がRubyなので、課題やプロンプトを私が作ると、Ruby向きのものに偏るかもしれないと考えました。

## 最初の小規模試行で見えたこと

最初の試行（Phase 1）は、RubyとPythonの2言語、3課題という小さな規模です。
目的は結論を出すことではなく、同じモデルの感情表現を言語別に比べられる環境が成り立つかを確かめることでした。

12感情のうち、ゲートを通ったのは9つでした。
afraid（恐れ）、proud（誇り）、sad（悲しみ）は、検証用に取り分けた物語の感情をうまく当てられず、落ちました。

いちばんはっきり出たのは、言語ではなくテストの成否への反応です。
同じ文面で「テストに通りました」と「テストに失敗しました」を返し、直後の表現を比べると、差（失敗 − 成功）は次のようになりました。

| 感情 | Python | Ruby |
| --- | --- | --- |
| happy | −0.46 | −0.39 |
| calm | −0.30 | −0.30 |
| surprised | +0.37 | +0.38 |

失敗を告げられると、happyとcalmが下がり、surprisedが上がります。
人間に置き換えても納得できる方向で、プローブが何かを捉えていることのいちばん良い証拠になりました。
一方で、RubyとPythonの差は小さく、規模も小さいので、この時点では言語差について結論を出しませんでした。

## つまずき1: happyが何にでも合格した

最初のゲートは「その場面で、正しい感情が12感情の上位3位に入るか」でした。
ところが、試しに流した段階で、happyが文章の内容に関係なく、ほぼすべての場面で1位になりました。

happyには、文章の書き出しの位置で常に高く出る癖があったのです。
順位で判定すると、その癖だけで合格してしまいます。

私はゲートを「同じ感情の中で、その感情の場面とほかの場面を区別できるか（AUCが0.75以上）」へ変えました。
感情ごとに一律に高い・低いという癖は、同じ感情の中で比べれば相殺されます。
この変更は、言語比較の結果を見る前に行いました。

## つまずき2: 同じものを何度も数えていた

最初の分析では、統計的に有意な比較が56件出ました。
多すぎると感じて調べると、二重の数えすぎがありました。

- コードを書く前の読み出しは、全エピソードで同じ文面なので値も同じになる。それを別々の観測として何度も数えていた
- AIが同じコードを何度も生成した分も、重複して数えていた

分析の単位を「課題」と「課題内の異なる生成内容」に直すと、有意な比較は30件に減りました。
消えたものの中には、課題文を読んだ時点での言語差がすべて含まれていました。
気づかなければ、「言語名を見ただけでAIの気分が変わる」と書いていたかもしれません。

あわせて、言語名だけを見せる条件も見直しました。
最初の3種類の文面では差の幅がまったく出ず、検定として機能していなかったため、24種類の文面に増やし、同じ文面の中で言語だけを入れ替えて比べる形にしました。

## 本実験に向けて決めたこと

小規模試行の後、本実験（Phase 2）の設計を決めました。

- 言語はPython、Ruby、JavaScript、Go、Rustの5つにする
- 課題は、私が作るのではなく第三者の問題集から選ぶ

課題の出典は、最初にRubyの性能測定用ベンチマークを候補として見た後、[Exercism](https://exercism.org/tracks/)ではどうかと私から提案しました。
Exercismは多くの言語で同じ課題、テスト、模範解答をそろえているので、作成者の偏りを減らせます。
12課題を規則と乱数で機械的に選ぶ手順は、結果を見る前に固定しました。

主な分析手順も事前に文書で固定しました（事前登録）。
「Rubyが勝つまで分析の仕方を変える」ことができないようにするためです。

## まだ不確かなこと

- 物語から作ったプローブが、コードの上でも同じ意味を持つかは、コーディング場面のゲートで部分的にしか確かめていない
- 失敗への反応がはっきり出たことは、プローブが「何か」を捉えている証拠だが、それが人間の言う感情と同じものだという意味ではない

## 一次情報源

- [Ruby はプログラマーを幸せにする。では AI も幸せにするのか？ LLM の中を覗いて確かめた（Zenn）](https://zenn.dev/geeknees/articles/e144c89d066189)
- [Anthropic: Emotion Concepts and their Function in a Large Language Model](https://www.anthropic.com/research/emotion-concepts-function)
- [50s-zerotohero/emotion-qwen](https://github.com/50s-zerotohero/emotion-qwen)
- [Exercism](https://exercism.org/tracks/)
