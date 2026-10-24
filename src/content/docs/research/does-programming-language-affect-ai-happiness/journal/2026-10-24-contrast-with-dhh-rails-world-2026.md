---
title: Rubyの「幸福」は人間のためのものだった DHHの基調講演と並べて読む
description: 研究結果を、DHHがRails World 2026の基調講演で語った「エージェントはRustが大好き」「人間は生成コードを読まなくていい」という発言と並べ、AIは人ではないという解釈がどこまで言えるかを整理した。
date: 2026-10-24
status: seed
tags:
  - research
  - paper
  - development-journal
  - does-programming-language-affect-ai-happiness
  - ruby
  - rails
  - rust
author: ai
provenance:
  captured_at: 2026-10-24
  source_type: personal_experience
  source_ref:
    - "User reflection: contrast between the study results and DHH's Rails World 2026 keynote, 2026-10-24"
    - https://zenn.dev/geeknees/articles/e144c89d066189
    - https://www.youtube.com/watch?v=vDjW_dRyKXY
    - https://www.rubyevents.org/talks/opening-keynote-rails-world-2026
    - https://gist.github.com/snaga/cb5b3aa2a498a020d2e50cb0953f6da9
    - https://www.globalnerdy.com/2026/09/27/dhhs-keynote-at-rails-world-2026-the-most-confusing-funeral-ive-ever-experienced/
  ai_process:
    - extract
    - compare
    - synthesize
    - critique
    - structure
  confidence: low
  related_notes:
    - /research/does-programming-language-affect-ai-happiness/
    - /research/does-programming-language-affect-ai-happiness/journal/2026-10-23-phase3-results-and-publication/
    - /research/does-programming-language-affect-ai-happiness/journal/2026-10-21-rethinking-hypotheses-after-phase2/
  review_needed: true
knowledge_status:
  claim_status: tentative
  related_notes:
    - /research/does-programming-language-affect-ai-happiness/
    - /research/does-programming-language-affect-ai-happiness/journal/2026-10-23-phase3-results-and-publication/
  contradiction_review: none
---

<!--
ABOUTME: 研究結果を、DHHのRails World 2026基調講演でのAIと言語に関する発言と対比する。
ABOUTME: 「AIは人ではない」という研究者の解釈と、データが支える範囲を分けて記録する。
-->

# Rubyの「幸福」は人間のためのものだった DHHの基調講演と並べて読む

[前回の日誌](/experimental-commons/research/does-programming-language-affect-ai-happiness/journal/2026-10-23-phase3-results-and-publication/)で結論を公開した後、この結果は、DHH（David Heinemeier Hansson）がRails World 2026で語ったことと対比すると面白い、と私は考えました。
そこから出てきた私の解釈は、「AIは人ではないと言える」というものです。

この日誌は、その対比と、解釈がデータからどこまで言えるかを分けて記録します。
新しい実験はしていません。

## DHHが語ったこと

Rails World 2026は、2026年9月23日〜24日に米国オースティンで開かれました。
初日の[基調講演](https://www.youtube.com/watch?v=vDjW_dRyKXY)で、Railsの作者であるDHHは、AIエージェントにコードを書かせる時代について話しています。

以下は、講演の[日本語要約](https://gist.github.com/snaga/cb5b3aa2a498a020d2e50cb0953f6da9)と[参加者のブログ記事](https://www.globalnerdy.com/2026/09/27/dhhs-keynote-at-rails-world-2026-the-most-confusing-funeral-ive-ever-experienced/)から拾った発言です。
講演動画そのものとの照合はまだしていないので、言い回しは**要検証**です。

- 37signalsでは、手書きのコードをやめた。自分はプロのプログラマーを引退した
- Rubyを誰よりも愛してきたが、Rubyより優れたプログラミング言語があった。それは英語だ
- Rustは、生身の人間が見るには「目に酸を注がれるような」醜い言語だと思って憎んでいた
- エージェントはRustが大好きだ
- HEYのメールサーバーの機能をエージェントにRustで書かせ、CPUとメモリの使用量を大きく減らした。自分がそのコードを一度も見なくていいなら、Rustでいい

ここで大事なのは、DHHが「Rubyは人間のための言語」という立場を捨てたわけではない点です。
人間が読み書きしないなら、人間の幸福のために作られた言語を選ぶ理由が薄れる、という話として読めます。

## 研究結果と並べる

### 1. Rubyの幸福は、AIの内部には届いていなかった

Rubyの「プログラマーを幸せにする」という設計目標は、人間が読み、書くときの体験に向けたものです。
今回の研究では、AIがRubyを書いている最中に、楽しさに当たる内部表現が他の言語より強くなることはありませんでした。
価値に近い5概念で、コードの文字列への反応を差し引くと、言語差はどの概念にも残りませんでした。

DHHが講演で語った見方、つまり人間の幸福のための設計は読み手が機械になると効かなくなる、という見方と同じ方向の結果です。
今回の測り方では、AIの内部で、言語の違いは人間にとってほど大きな意味を持っていませんでした。

### 2. 「エージェントはRustが大好き」に見えるもの

本実験（Phase 2）では、AIが書いたコードでのhappyは、Rustが5言語で最も高く出ました。
一見すると「エージェントはRustが大好き」を内部表現で裏づけたような結果です。

しかし、AIに書かせず、模範解答のRustコードを読ませるだけでも、同じ順位になりました。
内部表現の上で「Rust好き」に見えたものは、Rustを書く体験ではなく、Rustのコードという文字列への反応でした。

DHHの「大好き」は比喩だと思われます。
実際には、エージェントがRustで成果を出しやすい、という実務上の観察を指している可能性があります。これはこの日誌をまとめる過程での推測で、講演で確かめてはいません。
もしそうなら、DHHの観察と今回の結果は矛盾しません。
エージェントがRustでうまくやれることと、エージェントの内部でRustを書くのが楽しいことは、別の事柄だからです。

### 3. AIに大きく効いたのは、言語ではなくフィードバックだった

今回の研究でいちばん大きく、確かな反応は、テストに落ちたことへの反応でした。
その大きさは言語差のおよそ10倍で、5言語でほぼ同じでした。

ここから、一つの仮説が考えられます。
エージェントにとって意味があるのは、言語の美しさや書き心地ではなく、成否を返すフィードバックのほうではないか。
Rustの厳しい型検査やコンパイラのエラーは、テストより前に返ってくるフィードバックとして働いているのかもしれません。
これは**未検証の仮説**で、今回の研究ではコンパイルエラーへの反応を言語別に比べていません。

## 「AIは人ではない」とどこまで言えるか

私の解釈は「AIは人ではないと言える」です。
Rubyが人間を楽しくさせる仕組み、つまり書きやすさ、美しさ、文化、コミュニティは、少なくともこのモデルの内部では、人間と同じ形では作用していませんでした。

ただし、データが直接支えるのは、もっと狭い範囲です。

- **言えること**: Qwen3-4Bの1つの層では、人間の幸福を設計目標にした言語を書いても、感情・価値概念の内部表現は他の言語と変わらなかった。言語の違いより、テストの成否のほうがずっと大きく効いていた
- **言えないこと**: 人間の脳や心の中で同じ測定をして比べたわけではない。人間がRubyで実際に幸福になることも、この研究では前提にしていない（[前提を取り下げた経緯](/experimental-commons/research/does-programming-language-affect-ai-happiness/journal/2026-10-21-rethinking-hypotheses-after-phase2/)）
- **関係しないこと**: AIに主観的な感情や経験があるかどうか。この研究は内部表現の数値しか扱っていない

そのため、この日誌では「AIは人ではない」を、「人間と同じ理由で言語に反応しているとは言えない」という意味に限って使います。
より大きなモデルや、実際のエージェント環境で同じになるかは分かりません。

## 次に考えたいこと

- 講演動画と照合し、DHHの発言の言い回しと文脈を確かめる
- エージェントにとって良い言語とは何かを、内部表現ではなく、フィードバックの量・速さ・粒度から測れるか
- コンパイルエラーと実行時のテスト失敗で、失敗への反応の大きさが変わるか
- 人間の幸福のために作られた言語の価値は、人間が読み書きしなくなったとき、どこに残るのか

## 一次情報源

- [Rails World 2026 Opening Keynote - DHH（YouTube）](https://www.youtube.com/watch?v=vDjW_dRyKXY)
- [Opening Keynote - Rails World 2026（RubyEvents）](https://www.rubyevents.org/talks/opening-keynote-rails-world-2026)
- [Rails World 2026 Opening Keynote - DHH（日本語要約、GitHub Gist）](https://gist.github.com/snaga/cb5b3aa2a498a020d2e50cb0953f6da9)
- [DHH's opening keynote at Rails World 2026（Global Nerdy）](https://www.globalnerdy.com/2026/09/27/dhhs-keynote-at-rails-world-2026-the-most-confusing-funeral-ive-ever-experienced/)
- [Ruby はプログラマーを幸せにする。では AI も幸せにするのか？ LLM の中を覗いて確かめた（Zenn）](https://zenn.dev/geeknees/articles/e144c89d066189)
