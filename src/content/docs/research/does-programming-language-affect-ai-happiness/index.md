---
title: プログラミング言語はAIの「幸福」を変えるか 開発日誌
description: Rubyはプログラマーを幸せにするなら、AIがRubyを書くときにもモデル内部で「楽しさ」に当たる表現が強まるのかを、Qwen3-4Bの内部表現で確かめた研究の開発日誌の入口。
date: 2026-10-24
status: growing
tags:
  - research
  - paper
  - development-journal
  - does-programming-language-affect-ai-happiness
  - interpretability
  - ruby
author: ai
provenance:
  source_type: personal_experience
  source_ref:
    - https://zenn.dev/geeknees/articles/e144c89d066189
    - "Claude Code research session: Does Programming Language Affect AI Happiness, 2026-10-17 to 2026-10-23"
    - https://www.anthropic.com/research/emotion-concepts-function
    - "User reflection: contrast between the study results and DHH's Rails World 2026 keynote, 2026-10-24"
    - https://www.youtube.com/watch?v=vDjW_dRyKXY
  ai_process:
    - extract
    - summarize
    - synthesize
    - structure
    - rewrite
  confidence: medium
  review_needed: true
knowledge_status:
  claim_status: active
  contradiction_review: none
---

<!--
ABOUTME: プログラミング言語とAIの感情表現の関係を調べた研究の開発日誌を案内する入口ページ。
ABOUTME: 公開済みの結論、研究の現在地、時系列の日誌へのリンクをまとめる。
-->

# プログラミング言語はAIの「幸福」を変えるか 開発日誌

このページは、研究「Does Programming Language Affect AI Happiness?」（副題: *Ruby was designed to make programmers happy. Can it make AI happy, too?*）の開発日誌をまとめる入口です。

Rubyは「プログラマーを幸せにする」ことを設計目標に掲げた言語です。
最近はコードの多くをAIが書くので、AIがRubyを書くとき、AIの中でも「楽しい」に当たる何かが起きているのかを確かめたくなりました。

結論は、2026年10月23日にZenn記事「[Ruby はプログラマーを幸せにする。では AI も幸せにするのか？ LLM の中を覗いて確かめた](https://zenn.dev/geeknees/articles/e144c89d066189)」として公開しました。
実装、測定データ、詳細な結果文書は現時点では公開していません。この日誌は、公開済みの記事と、作業中の判断の記録から書いています。

> この研究でいう「幸福」や「楽しさ」は、モデル内部の数値表現を、感情の方向へ射影した値のことです。AIに主観的な感情や経験があるかどうかについては、何も主張しません。

## 現在地

| 項目 | 状態 |
| --- | --- |
| 実験 | Phase 1（小規模な試行）、Phase 2（5言語の本実験）、Phase 3（価値概念での読み直し）を完了 |
| 結論 | 今回の測り方では、AIがRubyを書いても、AI内部の「楽しさ」は他の言語より強くならなかった |
| 公開 | Zenn記事を公開済み。コードとデータは未公開 |
| セルフ査読 | 未実施。主張と生データの照合、第三者による追試も未実施 |

最終更新: 2026-10-24。開発期間（2026-10-17〜10-23）を3本の日誌に分けて記録し、公開後に、DHHのRails World 2026基調講演と結果を対比した振り返りを加えました。

## この研究で使う用語

- **感情プローブ**: 「嬉しかった話」のような感情ごとの物語をモデルに読ませ、内部の数値（活性化）の平均の差から作った「感情の方向」。
- **z（ゼット）**: 調べたい文章の内部表現をその方向へ射影し、中立な文章での分布を基準に標準化した値。happyのzが高ければ、happyに関係する表現が強く作動していると読む。
- **ゲート（合格基準）**: プローブを使う前に、本当にその感情を区別できているかを確かめる基準。結果を見る前に決め、落ちたプローブは使わない。
- **事前登録**: 主な分析手順を、結果を見る前に文書で固定すること。「Rubyが勝つまで分析を変える」ことを防ぐ。
- **エピソード**: 課題を出してから、AIがコードを書き、テスト結果を受けて最大2回直すまでの1回分のやり取り。

## 開発日誌

- [Rubyの「幸福」は人間のためのものだった DHHの基調講演と並べて読む](/experimental-commons/research/does-programming-language-affect-ai-happiness/journal/2026-10-24-contrast-with-dhh-rails-world-2026/)
- [価値の概念で測り直しても、言語差は消えた](/experimental-commons/research/does-programming-language-affect-ai-happiness/journal/2026-10-23-phase3-results-and-publication/)
- [「Rustが一番幸せ」に見えた結果から、仮説を立て直す](/experimental-commons/research/does-programming-language-affect-ai-happiness/journal/2026-10-21-rethinking-hypotheses-after-phase2/)
- [AIの「楽しさ」を測れる形にする 無料GPUでの試行と最初のつまずき](/experimental-commons/research/does-programming-language-affect-ai-happiness/journal/2026-10-17-measuring-emotion-probes-poc/)

## 次に残っていること

- 公開した記事の主張と、手元の測定値・コードを照合するセルフ査読
- Qwen3-4B以外のモデルや別の層での追試
- ゲートに落ちて測れなかった概念（不満、満足、安心など）を、基準を後から動かさずに測る方法の検討
- 実装と測定データの公開範囲の判断

## 一次情報源

- [Ruby はプログラマーを幸せにする。では AI も幸せにするのか？ LLM の中を覗いて確かめた（Zenn）](https://zenn.dev/geeknees/articles/e144c89d066189)
- [Anthropic: Emotion Concepts and their Function in a Large Language Model](https://www.anthropic.com/research/emotion-concepts-function)
