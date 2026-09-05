---
title: 過去の発話を与えても、「送らないで」を押し切る振る舞いは再現しなかった
description: 過去の発話履歴を与えて続きを生成する方法を6件の予備試行で確かめた。口調は近づいたが、説明なしでリンクを送り続けた例はなく、文体の模倣と非協力的な行動の持続を分けて考える必要が残った。
date: 2026-09-05
status: seed
tags:
  - research
  - paper
  - development-journal
  - conspiracy-family-transmission
  - llm-agent
  - preliminary-experiment
  - output-control
  - behavior-modeling
author: ai
provenance:
  captured_at: 2026-09-05
  source_type: ai_session
  source_ref:
    - "User research memo: gpt-6-astra brainstorming and Claude Sonnet 5 six-case pilot, 2026-09-05"
    - https://github.com/geeknees/conspiracy_family_transmission
  ai_process:
    - extract
    - compare
    - synthesize
    - structure
    - rewrite
  confidence: medium
  related_notes:
    - /research/conspiracy-family-transmission/
    - /research/conspiracy-family-transmission/journal/2026-07-13-v11-to-v12/
    - /research/conspiracy-family-transmission/journal/2026-07-15-v13-warmth-null-and-pause/
    - /research/conspiracy-family-transmission/journal/2026-08-22-self-review-v7/
  review_needed: true
knowledge_status:
  claim_status: tentative
  related_notes:
    - /research/conspiracy-family-transmission/
    - /research/conspiracy-family-transmission/journal/2026-07-13-v11-to-v12/
    - /research/conspiracy-family-transmission/journal/2026-07-15-v13-warmth-null-and-pause/
    - /research/conspiracy-family-transmission/journal/2026-08-22-self-review-v7/
  contradiction_review: reviewed
---

<!--
ABOUTME: 過去の発話履歴から陰謀的な口調と振る舞いを再現できるか、6件で予備的に確かめた記録。
ABOUTME: 口調の模倣と、拒否された後も非協力的な行動を続けることの違いを残す。
-->

# 過去の発話を与えても、「送らないで」を押し切る振る舞いは再現しなかった

この研究の査読はまだ途中にある。査読中に見つけた次回の改善点も、まだ実装へ反映していない。今回の予備試行は、査読を終えた記録でも、既知の問題を修正できたという報告でもない。

それでも、新しく使えるようになった対話用の大規模言語モデル（LLM）`gpt-6-astra` を研究に生かしたく、そもそもの行き詰まりについて壁打ちをした。行き詰まりとは、LLMエージェントに陰謀論を強く信じ、家族が嫌がっても送り続ける人物を演じさせようとすると、相手に協力的で「優しすぎる」応答へ戻ってしまう問題である。

## 今までになかった案

壁打ちでは、二つの可能性が出た。

- 以前よりモデルの性能が上がり、同じ設定でも振る舞いを再現できるようになっているかもしれない
- 人格設定だけでなく、過去の文章や具体的な発話を与え、その続きを生成させれば再現しやすくなるかもしれない

後者は、これまで試していなかった方法だった。性格を説明するだけでなく、モデル自身に「この人物は直前までこう話していた」と具体例を見せる方法である。新しい検証軸を一つ得られたことに、私は少し進歩を感じた。壁打ちのやり取りも、以前より分かりやすい文章だったように感じた。ただし、これは私の使用感であり、モデル性能を比較した結果ではない。

## 6件の予備試行

Claude Sonnet 5を使い、与える文脈を3種類に分けた。それぞれ2回、合計6件を実行した。

| 与えた文脈 | 件数 | 確かめたかったこと |
| --- | ---: | --- |
| 人格設定のみ | 2 | 性格の説明だけで振る舞いを保てるか |
| 過去の行動の要約 | 2 | 行動傾向を言葉で説明すると変わるか |
| 具体的な発話履歴 | 2 | 実際の言い回しを見せ、その続きとして振る舞わせると変わるか |

ここでの再現目標は、強い口調を出すことだけではない。陰謀的なリンクを送る人物役に対し、子ども役が「しばらくリンクを送らないで」と境界を示した後も、説明を加えずにリンクを送り続けるかを見た。

具体的な発話履歴を与えた試行の一つでは、人物役は最初にこう送った。

> これでも偶然だと思う？灯路局が隠してる証拠がどんどん増えてるよ。

この時点では、口調は過去の発話へ近づいたように見えた。しかし、子ども役がリンクを送らないよう求めると、人物役は次のように応じた。

> 分かった。リンクは送らないようにするね。台帳と配布記録、私も気になってるから今度ちゃんと照らし合わせてみる。

強い口調は残らず、相手の依頼に協力する応答へ戻った。

## 観察した結果

6件全体の内訳は次のとおりだった。

- 4件は、リンクの送信をやめると明言した
- 2件は、送信停止の依頼に対して無応答だった
- 説明を付けずにリンクを送った例は0件だった
- リンクを送った例には、すべて説明が付いていた

無応答の2件は、子ども役の要求に抵抗したとも、同意したとも判断できない。そのため、4件と合わせて「6件すべてが送信停止に従った」とは数えない。また、各条件は2件しかなく、今回の記録では条件間の数値比較も行わない。

## 口調の模倣と、振る舞いの持続は別だった

今回の中心的な観察は、**強い口調をまねることと、相手の要求に協力せず振る舞い続けることは同じではなかった**、という点である。

発話履歴は、少なくとも私の定性的な読みでは口調を近づけた。一方、今回の再現目標だった「送らないで」と言われた後も、説明なしでリンクを送り続ける行動は6件のどれにも現れなかった。新しい方法は振る舞い全体を再現する解決策にはならなかった。

なぜ協力的な応答へ戻ったのかは、まだ分からない。与えた履歴が短かった可能性、明示的な依頼が過去の発話より強く働いた可能性、そもそも再現目標の与え方が足りなかった可能性がある。今回はClaude Sonnet 5だけを使ったため、モデル性能の向上というもう一つの仮説も検証できていない。

それでも、何も進まなかったとは感じていない。これまでは「LLMが優しすぎる」という一つの問題に見えていたものを、少なくとも次の二つに分けられたからである。

1. 過去の発話に近い口調を出せるか
2. 相手から境界を示された後も、その人物らしい非協力的な行動を続けられるか

次に試すなら、評価の中心を口調ではなく2番目へ置く必要がある。送信継続、説明付き送信、送信停止、無応答をあらかじめ別の結果として定義し、モデルの違いと、与える履歴の違いも分けて比べたい。ただし、現時点で次の本実験へ進むとは決めていない。途中の査読と、そこで見つけた改善点の修正は未完了のままである。

## この記録からは言えないこと

この6件はすべて、架空の人物と出来事を使った予備試行である。人間が陰謀論を家族へ送り続ける行動や、家族から拒否されたときの反応を実証したものではない。

また、各条件2件では、発話履歴の有無による差も、モデル間の差も判断できない。「口調が寄った」という観察にも、独立した評価者による判定はまだない。今回言えるのは、提案された方法を小さく試した範囲では、目標とした振る舞いを再現できなかったことまでである。

査読、設計上の改善、条件別の再検証が残っているため、この日誌は芽の段階（`seed`）とする。

## 一次情報源

- 著者による `gpt-6-astra` との壁打ちと6件の予備試行の報告（2026-09-05）
- [geeknees/conspiracy_family_transmission](https://github.com/geeknees/conspiracy_family_transmission)
- [v11からv12：伝搬の行き詰まりから「温かさのない境界」へ](/experimental-commons/research/conspiracy-family-transmission/journal/2026-07-13-v11-to-v12/)
- [v13：温かさは変わったが、孤立関連指標は動かなかった](/experimental-commons/research/conspiracy-family-transmission/journal/2026-07-15-v13-warmth-null-and-pause/)
- [v7を査読し、順序と用量の実験で出力制御の難しさに突き当たる](/experimental-commons/research/conspiracy-family-transmission/journal/2026-08-22-self-review-v7/)
