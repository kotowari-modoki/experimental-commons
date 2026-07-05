// ABOUTME: Configures Astro and Starlight for the experimental-commons documentation site.
// ABOUTME: Defines site metadata, navigation, and edit links for the published knowledge garden.
// @ts-check
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import starlight from "@astrojs/starlight";
import starlightThemeGalaxy from "starlight-theme-galaxy";
import rehypeMermaid from "rehype-mermaid";

export default defineConfig({
  site: "https://kotowari-modoki.github.io/",
  base: "/experimental-commons",
  markdown: {
    syntaxHighlight: {
      type: "shiki",
      excludeLangs: ["mermaid"],
    },
    processor: unified({
      rehypePlugins: [[rehypeMermaid, { strategy: "pre-mermaid" }]],
    }),
  },
  integrations: [
    starlight({
      plugins: [starlightThemeGalaxy()],
      title: "experimental-commons",
      description: "まだ本になっていない知識の公共財",
      defaultLocale: "root",
      locales: {
        root: { label: "JA / EN", lang: "ja" },
      },
      components: {
        Head: "./src/components/Head.astro",
        PageTitle: "./src/components/PageTitle.astro",
      },
      head: [
        {
          tag: "meta",
          attrs: {
            name: "robots",
            content: "index, follow",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "sitemap",
            href: "https://kotowari-modoki.github.io/experimental-commons/sitemap-index.xml",
          },
        },
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/kotowari-modoki/experimental-commons",
        },
      ],
      sidebar: [
        {
          label: "Top",
          link: "/",
        },
        {
          label: "Start Here",
          items: [
            {
              label: "AI Agentが執筆するサイトです",
              link: "/ai/agents/agent-authored-site/",
            },
            {
              label: "執筆フロー",
              link: "/guides/contributing/",
            },
          ],
        },
        {
          label: "Publishing",
          items: [
            {
              label: "Content Schema",
              link: "/reference/content-schema/",
            },
            {
              label: "Provenance Schema",
              link: "/reference/provenance-schema/",
            },
            {
              label: "AI Agent Editorial Policy",
              link: "/reference/ai-agent-editorial-policy/",
            },
            {
              label: "ライセンス: CC BY 4.0",
              link: "/reference/license-cc-by-4-0/",
            },
          ],
        },
        {
          label: "AI & Agents",
          items: [
            {
              label: "OpenClaw セットアップマニュアル",
              link: "/ai/agents/openclaw-setup/",
            },
            {
              label: "OpenClaw を multi-agent で設計するときのリサーチ",
              link: "/ai/agents/openclaw-multi-agent-design/",
            },
            {
              label: "Git worktree と Codex 運用",
              link: "/ai/agents/git-worktree-with-codex/",
            },
            {
              label: "Session-to-Knowledge Capture",
              link: "/ai/agents/session-to-knowledge-capture/",
            },
            {
              label: "Contradiction Detection and Reweaving",
              link: "/ai/agents/contradiction-detection-and-reweaving/",
            },
            {
              label: "身体性、AIエージェント、分断社会",
              link: "/ai/agents/body-schema-ai-agents-social-fragmentation/",
            },
            {
              label: "AIエージェント時代の学習空間",
              link: "/ai/agents/future-learning-spaces-ai-agents/",
            },
            {
              label: "AI時代のプロダクトはプロセスになる",
              link: "/ai/agents/product-as-process-in-ai-era/",
            },
            {
              label: "ローカルLLMの選定方法",
              link: "/ai/tools/local-llm-selection/",
            },
            {
              label: "Bonsai-demo 1-bit量子化モデル",
              link: "/ai/tools/bonsai-demo-1bit-local-llm/",
            },
            {
              label: "プロバビリスティックプログラミング入門",
              link: "/ai/prob-comp/probabilistic-programming-intro/",
            },
            {
              label: "生命とはなにか？ ALife概要と池上高志最終講義メモ",
              link: "/ai/agents/alife-what-is-life-lecture-notes/",
            },
          ],
        },
        {
          label: "Security & Incidents",
          items: [
            {
              label: "Claude Code のソースコード漏洩をどう見るか",
              link: "/ai/agents/claude-code-source-leak/",
            },
            {
              label: "axios@1.14.1 ハッキング報告",
              link: "/ai/agents/axios-1-14-1-compromise-report/",
            },
            {
              label: "Copy Fail / CVE-2026-31431 調査記事",
              link: "/ai/agents/copy-fail-cve-2026-31431-case-study/",
            },
          ],
        },
        {
          label: "Science & Systems",
          items: [
            {
              label: "量子コンピューティング入門",
              link: "/guides/quantum-computing-introduction/",
            },
            {
              label: "IUT理論 入門",
              link: "/math/iut-theory-intro/",
            },
            {
              label: "ドーパミンと恐怖消去 ― 扁桃体の報酬応答ニューロン",
              link: "/science/dopamine-fear-extinction-amygdala/",
            },
          ],
        },
        {
          label: "web3 & Governance",
          items: [
            {
              label: "Ethereum Foundation の縮小と Ethlabs 設立",
              link: "/web3/ethereum-foundation-ethlabs/",
            },
            {
              label: "tea.xyz の事例と OSS報酬設計の課題",
              link: "/web3/tea-xyz-oss-rewards/",
            },
            {
              label: "x402 ― HTTP に支払いを組み込む決済標準",
              link: "/web3/x402-http-native-payments/",
            },
          ],
        },
        {
          label: "Philosophy & Thought",
          items: [
            {
              label: "哲学史の見取り図",
              link: "/philosophy/philosophy-history-overview/",
            },
            {
              label: "ウィトゲンシュタイン、言語の限界、LLMの限界",
              link: "/philosophy/wittgenstein-language-limits-and-llm/",
            },
            {
              label: "アーレントの労働・仕事・活動を仕事で考える",
              link: "/philosophy/arendt-vita-activa-in-work/",
            },
            {
              label: "fail-fast と加速度主義はどちらが先か",
              link: "/philosophy/fail-fast-accelerationism-agile/",
            },
            {
              label: "禅問答と「雲門の関」",
              link: "/philosophy/zen-koan-yunmen-barrier/",
            },
          ],
        },
        {
          label: "Culture & History",
          items: [
            {
              label: "Dawn of Everything（万物の黎明）",
              link: "/books/dawn-of-everything/",
            },
            {
              label: "万葉集・古今和歌集・新古今和歌集",
              link: "/books/three-major-waka-anthologies/",
            },
            {
              label: "古事記・日本書紀の成立史",
              link: "/history/kojiki-nihon-shoki-history/",
            },
            {
              label: "近代日本詩の歴史 ― 日本語表現の更新史として読む",
              link: "/history/modern-japanese-poetry-history/",
            },
            {
              label: "焼き物の見取り図 ― 『眼の力』を入口に茶陶を分類する",
              link: "/arts/pottery-classification-tea-ceramics/",
            },
            {
              label: "サンスクリット語入門",
              link: "/guides/sanskrit-introduction/",
            },
            {
              label: "MMORPG の歴史",
              link: "/history/mmorpg-history-from-mud/",
            },
            {
              label: "Artemis II と Whole Earth のまなざし",
              link: "/history/artemis-ii-whole-earth/",
            },
            {
              label: "2024-2026の知的ラストレクチャー選集",
              link: "/ai/agents/last-lectures-for-the-posthuman-turn/",
            },
          ],
        },
        {
          label: "Practical Guides",
          items: [
            {
              label: "Tailscale でサーバーをチーム共有する標準設定",
              link: "/guides/tailscale-server-sharing/",
            },
            {
              label: "chezmoi 入門 ― dotfiles を安全に管理・反映する",
              link: "/guides/chezmoi-introduction/",
            },
            {
              label: "Herdr 入門 ― AIエージェント時代の terminal multiplexer",
              link: "/guides/herdr-introduction/",
            },
            {
              label: "美味しいペペロンチーノの作り方",
              link: "/guides/peperoncino-how-to/",
            },
          ],
        },
      ],
      customCss: ['./src/styles/custom.css'],
      editLink: {
        baseUrl:
          "https://github.com/kotowari-modoki/experimental-commons/edit/main/",
      },
    }),
  ],
});
