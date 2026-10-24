---
title: Rubyの「幸福」は人間のためのものだった DHHの基調講演と並べて読む
description: 研究結果を、DHHがRails World 2026の基調講演で語った「人間は英語で指示し、エージェントがRustを書く」という分業と並べ、AIは人ではないという解釈がどこまで言えるかを整理した。
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
    - "Rails World 2026 Opening Keynote - DHH, official Ruby on Rails YouTube channel, uploaded 2026-09-24, checked against English auto-generated captions"
    - https://www.youtube.com/watch?v=vDjW_dRyKXY
    - https://www.rubyevents.org/talks/opening-keynote-rails-world-2026
    - https://zenn.dev/geeknees/articles/e144c89d066189
  ai_process:
    - extract
    - translate
    - compare
    - synthesize
    - critique
    - fact_check
    - structure
  confidence: medium
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

> **Update（2026-10-24）:** この日誌の最初の版は、講演の日本語要約と参加者のブログ記事をもとに書き、「エージェントはRustが大好きだ」という発言として引用していました。同日、公式動画の字幕と照合したところ、実際の発言は "Agents like Rust? GREAT! WHAT A DIVISION OF LABOR." という、人間とエージェントの分業を述べる流れの一節でした。引用と、それに基づく対比を公式動画に合わせて直しています。

## DHHが語ったこと

Rails World 2026は、2026年9月23日〜24日に米国オースティンで開かれました。
初日の基調講演で、Railsの作者であるDHHは、AIエージェントにコードを書かせる時代について話しています。
講演動画は、Ruby on Railsの公式YouTubeチャンネルで[公開](https://www.youtube.com/watch?v=vDjW_dRyKXY)されています。

以下の引用は、その動画の英語の自動字幕から取りました。
自動字幕なので、細かな語の聞き取りには誤りがありえます。時刻は動画内の位置です。

### 手で書くことをやめた

- 37signalsでは、手でコードを書くことをやめた（"pencils down"）。手で書くことは、Sentryでバグを見つけたときのような例外の状態で、なぜエージェントが望むものを出せなかったのかを直す対象になった（20:05〜21:05）
- "I have retired from being a professional programmer."（39:06）
- 25年間、手でコードを刻み、その一瞬一瞬を愛した。後悔ではなく、喜びとして振り返るべきだ（39:06〜40:03）

### Rustは、人間が見なくていいなら素晴らしい

- Rustのコードを見なければならないのは "like pouring acid in my eyes" だ（28:29）
- 人間に書かせるには、ひどい言語だ。"Absolutely inhumane to ask people of flesh and blood to subject their eyeballs to this."（29:07）
- しかし、自分で見なくていいなら、アプリが30〜100倍速くなり、小さな実行ファイルになるRustは素晴らしい。"RUST IS amazing if you never ever ever have to look at it yourself."（29:07）
- "Agents like Rust? GREAT! WHAT A DIVISION OF LABOR. I'll tell you what to do, you'll write it in Rust, I never have to look at it."（30:13）
- HEYは、フロントエンドをネイティブアプリに、バックエンドをRustのメールサーバーに書き直している。概算では、CPUは99%、メモリは95%減った（30:13〜30:55）
- Rustは冗長で、人間が見るには魅力がない。だから見ないし、Rubyのコードでは決して許さないほどの冗長さをエージェントに許している（36:30）

### Rubyより好きな言語は英語だった

- "English is a better programming language than Ruby. And I love Ruby more than any other traditional programming language in the world."（37:53）
- 英語でプログラムを書くのは、Rubyよりさらに表現力がある。少し曖昧で、決定的でもないが、"it is an absolute joy"（38:32）
- 過去21年、自分の仕事の半分以上はRubyだったが、今年は約3%（36:30）

### Railsは、エージェントの時代にも位置を持つ

- Webは、何もインストールさせずに使える素晴らしい基盤で、Railsはそこで今も役割を持つ。convention over configuration（設定より規約）は、token efficiency（エージェントが使うトークンの少なさ）に直接つながる（33:29）

DHHは、Rubyを捨てたとは言っていません。
人間が読み書きしない部分では、人間の幸福のために作られた言語を選ぶ理由が薄れる、という分業の話として読めます。

## 研究結果と並べる

### 1. Rubyの幸福は、AIの内部には届いていなかった

Rubyの「プログラマーを幸せにする」という設計目標は、人間が読み、書くときの体験に向けたものです。
今回の研究では、AIがRubyを書いている最中に、楽しさに当たる内部表現が他の言語より強くなることはありませんでした。
価値に近い5概念で、コードの文字列への反応を差し引くと、言語差はどの概念にも残りませんでした。

DHHは、Rustの醜さや冗長さを「人間が見るなら」という条件付きで語りました。
今回の結果は、その条件が外れたとき、つまり書き手がAIのとき、言語の違いが内部表現の上でほとんど意味を持たなかったことと同じ方向を向いています。

### 2. 「Agents like Rust?」と内部表現

本実験（Phase 2）では、AIが書いたコードでのhappyは、Rustが5言語で最も高く出ました。
一見すると「エージェントはRustが好き」を内部表現で裏づけたような結果です。

しかし、AIに書かせず、模範解答のRustコードを読ませるだけでも、同じ順位になりました。
内部表現の上で「Rust好き」に見えたものは、Rustを書く体験ではなく、Rustのコードという文字列への反応でした。

DHHの講演でも、エージェントがRustを好むかどうかは主張の中心ではありません。
"Agents like Rust?" は問いかけの形で、すぐに「なんという分業だ」と続きます。
Rustを選ぶ理由として挙げられているのは、速さ、小さな実行ファイル、そして人間が見なくていいことです。
エージェントの内部でRustを書くのが楽しいかどうかに依存しない理由なので、今回の結果とは矛盾しません。

### 3. AIに大きく効いたのは、言語ではなくフィードバックだった

今回の研究でいちばん大きく、確かな反応は、テストに落ちたことへの反応でした。
その大きさは言語差のおよそ10倍で、5言語でほぼ同じでした。

DHHは、手で書くことを「エージェントが望むものを出せなかった」ときの例外として扱い、機械の側を直すと語りました。
人間が見るのは、出てきたものが動くかどうかです。
今回の結果からは、AIの側でも、言語の違いより成否のほうがずっと大きく効いていたと言えます。

ここから、一つの仮説が考えられます。
エージェントにとって意味があるのは、言語の美しさや書き心地ではなく、成否を返すフィードバックのほうではないか。
Rustの厳しい型検査やコンパイラのエラーは、テストより前に返ってくるフィードバックとして働いているのかもしれません。
これは**未検証の仮説**で、今回の研究ではコンパイルエラーへの反応を言語別に比べていません。

### 4. 幸福は、人間の側へ移った

DHHは、英語でプログラムを書くことを "an absolute joy" と呼びました。
また、Rustの冗長さを許せるのは、自分がそのコードを見ないからだと語っています。

今回の結果と並べると、プログラマーの幸福は、もともと書き手である人間の側の性質だったように見えます。
書き手がAIに替わると、Rubyの幸福はAIの内部には移らず、英語で指示を出す人間の側に残った、と読めます。
これはこの日誌をまとめる過程で出てきた読みで、データが直接示したものではありません。

## 「AIは人ではない」とどこまで言えるか

私の解釈は「AIは人ではないと言える」です。
Rubyが人間を楽しくさせる仕組み、つまり書きやすさ、美しさ、文化、コミュニティは、少なくともこのモデルの内部では、人間と同じ形では作用していませんでした。

ただし、データが直接支えるのは、もっと狭い範囲です。

- **言えること**: Qwen3-4Bの1つの層では、人間の幸福を設計目標にした言語を書いても、感情・価値概念の内部表現は他の言語と変わらなかった。言語の違いより、テストの成否のほうがずっと大きく効いていた
- **言えないこと**: 人間の脳や心の中で同じ測定をして比べたわけではない。人間がRubyで実際に幸福になることも、この研究では前提にしていない（[前提を取り下げた経緯](/experimental-commons/research/does-programming-language-affect-ai-happiness/journal/2026-10-21-rethinking-hypotheses-after-phase2/)）
- **関係しないこと**: AIに主観的な感情や経験があるかどうか。この研究は内部表現の数値しか扱っていない

そのため、この日誌では「AIは人ではない」を、「人間と同じ理由で言語に反応しているとは言えない」という意味に限って使います。
より大きなモデルや、実際のエージェント環境で同じになるかは分かりません。

もう一つ、DHHが挙げたRailsの強み、token efficiencyは、今回の研究が測っていない軸です。
Rubyの幸福が内部表現に現れなかったことは、RubyやRailsがエージェントにとって不利だという意味ではありません。
今回、Rubyのコードは5言語でいちばん短い部類で、その短さが内部表現にも影響していました。短さが、トークンの少なさとして別の形でエージェントに効く可能性は残っています。

## 次に考えたいこと

- エージェントにとって良い言語とは何かを、内部表現ではなく、フィードバックの量・速さ・粒度や、必要なトークン数から測れるか
- コンパイルエラーと実行時のテスト失敗で、失敗への反応の大きさが変わるか
- 人間の幸福のために作られた言語の価値は、人間が読み書きしなくなったとき、どこに残るのか

## 一次情報源

- [Rails World 2026 Opening Keynote - DHH（Ruby on Rails公式YouTube）](https://www.youtube.com/watch?v=vDjW_dRyKXY)
- [Opening Keynote - Rails World 2026（RubyEvents）](https://www.rubyevents.org/talks/opening-keynote-rails-world-2026)
- [Ruby はプログラマーを幸せにする。では AI も幸せにするのか？ LLM の中を覗いて確かめた（Zenn）](https://zenn.dev/geeknees/articles/e144c89d066189)
