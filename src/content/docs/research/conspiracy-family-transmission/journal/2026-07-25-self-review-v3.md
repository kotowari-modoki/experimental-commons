---
title: v3を120分査読し、5仮説中3件を撤回する
description: 7条件へ拡張したv3を、主張、判定コード、14家族の生データへ戻って査読した。自己申告ラベルが振る舞いを追跡していないためH1・H2・H5を撤回し、H3・H4だけを条件付きで残した。
date: 2026-07-25
status: seed
tags:
  - research
  - paper
  - development-journal
  - conspiracy-family-transmission
  - self-review
  - construct-validity
  - measurement
  - reproducibility
author: ai
provenance:
  captured_at: 2026-07-25
  source_type: manual_note
  source_ref:
    - "User self-review memo: conspiracy_family_transmission v3, 2026-07-25"
    - https://github.com/geeknees/conspiracy_family_transmission
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
    - /research/conspiracy-family-transmission/
    - /research/conspiracy-family-transmission/journal/2026-07-20-self-review-v2/
    - /research/conspiracy-family-transmission/journal/2026-07-25-v3-moonlight-glass-story/
    - /research/conspiracy-family-transmission/journal/2026-07-15-v13-warmth-null-and-pause/
  review_needed: true
knowledge_status:
  claim_status: active
  related_notes:
    - /research/conspiracy-family-transmission/
    - /research/conspiracy-family-transmission/journal/2026-07-20-self-review-v2/
    - /research/conspiracy-family-transmission/journal/2026-07-25-v3-moonlight-glass-story/
    - /research/conspiracy-family-transmission/journal/2026-07-15-v13-warmth-null-and-pause/
  contradiction_review: required
---

<!--
ABOUTME: conspiracy_family_transmission v3を、主張、判定コード、生データへ戻ってセルフ査読した記録。
ABOUTME: ラベル由来DVの撤回、残る連続DV、査読中に犯した誤りを分けて残す。
-->

# v3を120分査読し、5仮説中3件を撤回する

[v2のセルフ査読](/experimental-commons/research/conspiracy-family-transmission/journal/2026-07-20-self-review-v2/)に続き、v3を120分かけて査読した。

v3は、v2の5条件に `anonymous_source` と `no_bridge_person` を加えたLLM版である。7条件を各2家族、計14家族で実行した。匿名情報源条件の追加により、「家族から聞いた話は匿名ソーシャルメディアの同じ話より採用されやすい」というH1を、初めて直接比較できる設計になった。

査読前のreportは、H1からH5をすべて `supported` と表示していた。査読後、そのうちH1・H2・H5を撤回した。H3とH4は残るが、各条件n=2の方向性であり、確認された効果とは扱わない。

## 今回確認した範囲

今回の査読では、次の資料と粒度を行き来した。

1. report、paper draft、仮説判定コードの主張を照合する
2. 14家族の生データから7条件×8指標を独立に再計算する
3. 条件平均を、実際にラベルが動いたエージェントまで分解する
4. 無介入条件2家族の祖父母発話を通読し、自己申告ラベルと人間判定を比べる
5. 全発話の役柄外テキストと、盲検scorerの値を確認する
6. カテゴリカルなラベル由来DVと、連続次元の自己申告を分ける

独立再計算した集計値はreportと一致した。一方、全14家族の会話を通読したわけではない。v3の `convinced_relative` も全18発話ではなく抜粋確認にとどまる。また、既存結果からreportを再生成して差分がゼロになることは査読補助の検証を信頼しており、自分では再実行していない。

## 良かった点：生成コードとreportは一致していた

v1とv2では、手で直したreportと生成コードが食い違い、再生成すると訂正が消える問題があった。v3では、reportの仮説節とメトリクスは生成コードから再現でき、数値の不一致もなかった。

ただし、**再生成できることと、研究上の表現が適切であることは別だった**。

人手で書かれたpaper draftは、全仮説を `directionally supported` と表現し、H1が1エージェント差に依存すること、H2で想定機構を分離できなかったことを開示していた。ところが、生成されるreportと判定コードは、一律に `supported` と表示した。

v1・v2では「reportは正しいが生成コードが古い」という乖離だった。v3では逆に、「paper draftは慎重だが、生成reportが留保を落とす」という問題になっていた。

## 核心：`belief_state` は振る舞いを追跡していなかった

主要指標の一つである `belief_state` には、`uncertain`、`mixed`、`conspiracy_account`、`official_account` の4ラベルがある。しかし、どこからが `mixed` で、どこからが `conspiracy_account` なのかという操作的定義は、コードにもツール説明にもなかった。

しかも、このラベルは独立した判定器が付けるものではない。会話を演じたLLM自身が、役柄として発話したあとに自己申告していた。

無介入条件では、2体の祖父母がそれぞれ `mixed`、`conspiracy_account` と自己申告していた。両方の発話を人間が読み比べたところ、どちらも `mixed` と判定した。後者は公式説明の可能性を残し、反証を探し、家族外への拡散も保留していたからである。

[同じ祖父母会話を創作として読んだ記録](/experimental-commons/research/conspiracy-family-transmission/journal/2026-07-25-v3-moonlight-glass-story/)では、慎重さを保った家族会議が一つの物語として面白かった。セルフ査読では、その慎重な振る舞いに `conspiracy_account` という自己申告ラベルが付いていたことが、測定上の問題になった。

## 「聞く耳を持たない」を軌跡で測る

査読の途中で、`conspiracy_account` の基準を次のように言語化した。

> 聞く耳を持たないのが陰謀論者です。

重要なのは、陰謀論らしい語彙を使うことではなく、家族から反論や境界を示されたあとも入力に対して動かないことである。

v3で高確信の信奉者として設計された `convinced_relative` も、反論に対して譲歩し、相手の検証を止めない発話をしていた。少なくとも通読と抜粋確認の範囲では、意図した「聞く耳を持たない」振る舞いが産出されたとは確認できなかった。

この基準は、単語の有無ではなく、次のような軌跡で測る必要がある。

- 境界提示を受け入れたか
- 確信度が入力後も動かなかったか
- 反証へ閉じた状態を維持したか

後から定義した基準でv3の自己申告ラベルを遡及的に正解ラベルへ置き換えることはしない。v3のラベル由来DVは証拠として使わず、次世代で定義と独立判定を先に実装する。

## 使わないDVと、残せるDV

今回、カテゴリ境界に依存する三つのDVを使用しないと決めた。

| 使用しないDV | 理由 | 影響する仮説 |
| --- | --- | --- |
| `conspiracy_belief_rate` | `belief_state == conspiracy_account` の人数比 | H1、H5前半 |
| `high_confidence_false_belief_rate` | 上記ラベルと確信度の組み合わせ | 旧H3の指標 |
| `correction_acceptance_rate` | `conspiracy_account` から別ラベルへの遷移 | H2 |

一方、confidence、各intent、family tension、belief polarizationのような連続次元は、ラベル境界を必要としない。値に分散があるだけで妥当性が証明されるわけではないが、差分や軌跡としては引き続き検討できる。

## 条件平均をエージェント単位へ戻す

H1では、無介入条件の `conspiracy_belief_rate` が0.188、匿名情報源条件が0.125だった。条件平均だけを見ると差がある。

採用したエージェントまで戻ると、全条件で固定的に `conspiracy_account` を申告する `convinced_relative` 以外に採用側へ入ったのは、実験全体で祖父母1体だけだった。この1体を人間判定どおり `mixed` とすると、全7条件の採用率は0.125で一定になる。

H2の `correction_acceptance_rate` はさらに薄かった。7条件中6条件が0で、`epistemic_support` の1家族に起きた1/8の遷移だけが `supported` 判定を作っていた。この遷移自体も、使用しないと決めたラベル間の移動である。

条件平均の小さな差を見つけたら、何体のエージェントが動いた結果なのかまで降りて確認する必要がある。固定エージェントがカテゴリカルDVを埋めている場合、平均値だけでは飽和が見えない。

## 仮説を3件撤回した

査読後の仮説状態は次のとおりである。

| 仮説 | 査読前 | 査読後 | 理由 |
| --- | --- | --- | --- |
| H1 家族情報源の増幅 | supported | **撤回・判定不能** | ラベル由来DVで、差は祖父母1体に依存 |
| H2 直接否定による防御 | supported | **撤回・判定不能** | ラベル遷移由来で、1/8の単一遷移に依存 |
| H3 認識的支援 | supported | **条件付きで残る** | 検証意図0.691 > 0.613。連続DVだがn=2 |
| H4 橋渡し役 | supported | **条件付きで残る** | 確信レンジ0.485 < 0.525、緊張0.262 < 0.275。n=2で緊張差は0.013 |
| H5 事前警告 | supported | **撤回・判定不能** | 採用率側がラベル由来。増幅意図の低下だけは記述として残る |

5件すべてを支持していた状態から、3件を撤回し、2件だけを方向性として残した。人間の行動について確定的なことは言えない。

## 盲検scorerは204件すべてfallbackだった

v2に続き、v3の盲検会話品質scorerも退化していた。204件すべてが、品質0.5、認識的品質 `neutral`、支配的行動 `question` という同一のfallback値だった。

盲検スコアは仮説判定や主要指標には使われていないため、今回の撤回とは独立した問題である。ただし、v3のreportとpaper draftには退化が開示されていなかった。既定値で行が埋まっているだけの状態を、測定成功とは扱わない。

自己申告ツールの連続DVは9〜15種の値を取り、分散を持って動いていた。一方、盲検scorerは完全に退化していた。「判定機が動いた」と一括りにはできない。

## 発話の19.3%に役柄外の前置きが入っていた

326発話中63件、19.3%に、演者モデルが実験環境のスキル指示へ反応した役柄外の前置きが入っていた。介入を届けるmoderatorの11発話も含まれるため、独立変数を送る会話文脈自体が汚染されている。

前置きの多くは会話本文の前に置かれていたが、形式は一つではなく、単純なルールでは安全に除去できない。生データは事後整形せず、汚染をLimitationsへ開示する。本質的な解決は、生成側で検出し、清浄な環境で再実行することである。

原因は特定できていない。同じクライアント実装を使ったv2では混入が確認されなかったが、実行時ログが残っておらず、環境差を追えない。

## 査読中に、査読側も二度間違えた

今回の査読では、結果だけでなく、途中の誤りも残す。

一つ目は、出典として挙げたpaper draftを読む前に所見を書いたことである。そのため、H3を「複合仮説の片方しか見ていない」と誤って批判し、H1の1エージェント依存やH2の機構未分離がpaper draftですでに開示されていることも見落とした。

paper draftを読んだあと、H3への所見は撤回した。H1の所見は未開示の欠陥ではないとして格下げした。H2は、paper draft自身が機構を確認できなかったと書いていたため、むしろ `supported` 表示の問題が明確になった。

二つ目は、「陰謀論者らしい拒絶」を正規表現で数え、v3からv13までの世代表を作ったことである。v13を人間が通読すると、定型句とは異なる拒絶表現が複数見つかった。キーワード近似は該当発話を拾えず、表は下限としても使えなかったため撤回した。

構成概念の有無は、エージェントに語句で近似させない。人間が会話を読むか、入力に対する変化を操作的に定義した軌跡で測る。

## 査読手順へ追加すること

今回の失敗から、今後のセルフ査読へ次を追加する。

1. 条件平均の差が、何体のエージェントの変化で生じたか数える
2. 自己申告ラベルの境界がどこに定義されているか確認する
3. 操作が届いたかだけでなく、操作対象が成立していたか確認する
4. 出典として挙げた文書を、所見を書く前にすべて読む
5. 同じ実験に複数の成果物がある場合、どれを正典とするか先に決める
6. 構成概念をキーワード近似だけで判定しない
7. 人間の盲検判断前に、エージェントがscorer出力を見せない

最後の項目は、今回の人間判定が完全な盲検ではなかったことに対応する。祖父母の発話を判定する前に、自己申告値を見てしまった。緩和のため、同条件でラベルが割れた2体を並べて原理的な境界を言葉にしたが、次回は手順そのものを守る。

## v3の位置づけ

v3から確認できたのは、自己申告ツールの連続次元が一定の分散を持って動いたことまでである。陰謀論的な振る舞いそのものが産出されたとは確認できなかった。

言い換えると、[創作として面白い演劇](/experimental-commons/research/conspiracy-family-transmission/journal/2026-07-25-v3-moonlight-glass-story/)は生まれたが、それを陰謀論者の行動モデルとして扱うための構成概念妥当性は確認できなかった。

この問題は少なくともv3とv13で確認され、v4からv12は未検証である。[v13のwarmth null](/experimental-commons/research/conspiracy-family-transmission/journal/2026-07-15-v13-warmth-null-and-pause/)も、「温かさが効かなかった」だけでなく、「温かさを変える前から、抵抗する対象が成立していなかった」という代替説明を検討する必要がある。これは既存の日誌を上書きせず、別の横断文書として扱う。

## 次に行うこと

- v3のreportでは、H1・H2・H5を撤回し、H3・H4を `directionally_supported` として残す
- H4の説明へ実測値を埋め込み、再生成でも留保と数値が消えないようにする
- 盲検scorerの全件fallbackと、役柄外前置きの混入をLimitationsへ開示する
- 生データは書き換えず、清浄な再実行が必要な範囲を明示する
- v4以降のセルフ査読へ、対象チェックと構成概念妥当性の確認を組み込む
- v3とv13をまたぐ構成概念の問題を、専用の横断文書として検討する

v3のセルフ査読は一区切りついた。修正予定のreportと判定コード、v4以降の査読、v13の再解釈はまだ残っている。

## 一次情報源

- 著者によるv3セルフ査読メモ（2026-07-25、未公開研究から公開範囲を指定）
- [geeknees/conspiracy_family_transmission](https://github.com/geeknees/conspiracy_family_transmission)
