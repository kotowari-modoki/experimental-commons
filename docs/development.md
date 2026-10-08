<!--
ABOUTME: experimental-commons の開発時に守るテストと運用の注意点。
ABOUTME: README より細かい判断基準を置き、記事追加時のテスト負債を防ぐ。
-->

# Development Notes

## 現状の注意点

- テストは「機能ロジックの unit + 配線/メタデータの integration + ビルド済み出力の e2e」の3層構成です。
- 記事別のテストファイルは作らないでください。過去にあった本文文字列固定のテストは 2026-07 のリファクタリングで撤去し、`tests/content-routes.unit.test.mjs`、`tests/content-frontmatter.integration.test.mjs`、`tests/content-build-output.e2e.test.mjs` に集約しました。
- 記事本文の変更で必要な確認は、原則として `pnpm check`、`pnpm test`、`pnpm build` です。

## OGP画像の自動生成

`pnpm build` で、トップ・記事・タグ一覧のメタデータから1200×630のPNGを生成します。記事に画像パスを追加する作業は不要です。GitHub Pagesへは通常の静的アセットとして配信され、記事を公開するビルドに合わせて更新されます。リクエスト時に画像を生成するサーバーは使いません。

- `src/lib/og-image.js`: タイトル・説明・分野・status・dateの抽出、画像URL、OGP/Twitterメタタグ。
- `src/lib/og-image-renderer.js`: 既存のSharpによる描画。文字は同梱のM PLUS 1p Mediumで折り返し・縮小し、長すぎる場合は画像上だけ省略します。
- `src/pages/og/[id].png.ts`: [Astroの静的エンドポイント](https://docs.astro.build/ja/guides/endpoints/)として全画像を出力。
- `src/assets/fonts/`: フォント・出典・SIL OFL。ビルド時の外部取得はありません。

画像URLには描画内容のハッシュを使います。タイトルなどが変わればURLも変わります。デザイン、favicon、フォントを変更した場合は `og-image.js` の `TEMPLATE_VERSION` も上げてください。SNS側に保持された既存投稿のカードは、サービス側の再取得が必要なことがあります。

記事のfrontmatterの `head` に `og:image` または `twitter:image` を明示した場合は、その指定を優先します。画像の自動生成・HTMLへの接続は汎用の `tests/og-image.*.test.mjs` で検証し、記事別のテストは追加しません。

確認は `pnpm check` → `pnpm test:unit` → `pnpm test:integration` → `pnpm build` → `pnpm test:e2e` の順に行います。見た目は `dist/og/` のPNGを開くか、`pnpm dev` でページの `og:image` にある `/experimental-commons/og/<id>.png` を開いて確認できます。

システムフォントの有無を比較するときは、Fontconfigの描画設定を揃え、フォントディレクトリだけを変えます。OS既定の設定と最小設定を比較すると、ヒンティングなどの差でもPNGのハッシュが変わるため、フォントへの依存を切り分けられません。
