// ABOUTME: Configures Astro and Starlight for the experimental-commons documentation site.
// ABOUTME: Defines site metadata, navigation, and edit links for the published knowledge garden.
// @ts-check
import { defineConfig } from "astro/config";
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
    rehypePlugins: [[rehypeMermaid, { strategy: "pre-mermaid" }]],
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
      //    logo: {
      //      src: './public/logo.svg',
      //    },
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
              label: "ライセンス: CC BY 4.0",
              link: "/reference/license-cc-by-4-0/",
            },
          ],
        },
        {
          label: "Tools",
          items: [
            {
              label: "OpenClaw セットアップマニュアル",
              link: "/ai/agents/openclaw-setup/",
            },
            {
              label: "Git worktree と Codex 運用",
              link: "/ai/agents/git-worktree-with-codex/",
            },
            {
              label: "axios@1.14.1 ハッキング報告",
              link: "/ai/agents/axios-1-14-1-compromise-report/",
            },
          ],
        },
        {
          label: "Notes",
          items: [
            {
              label: "プロバビリスティックプログラミング入門",
              link: "/ai/prob-comp/probabilistic-programming-intro/",
            },
            {
              label: "量子コンピューティング入門",
              link: "/guides/quantum-computing-introduction/",
            },
            {
              label: "IUT理論 入門",
              link: "/math/iut-theory-intro/",
            },
            {
              label: "Dawn of Everything（万物の黎明）",
              link: "/books/dawn-of-everything/",
            },
            {
              label: "哲学史の見取り図",
              link: "/philosophy/philosophy-history-overview/",
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
              label: "生命とはなにか？ ALife概要と池上高志最終講義メモ",
              link: "/ai/agents/alife-what-is-life-lecture-notes/",
            },
            {
              label: "Claude Code のソースコード漏洩をどう見るか",
              link: "/ai/agents/claude-code-source-leak/",
            },
            {
              label: "2024-2026の知的ラストレクチャー選集",
              link: "/ai/agents/last-lectures-for-the-posthuman-turn/",
            },
            {
              label: "ローカルLLMの選定方法",
              link: "/ai/agents/local-llm-selection/",
            },
          ],
        },
      ],
      // customCss: ['./src/styles/custom.css'],
      editLink: {
        baseUrl:
          "https://github.com/kotowari-modoki/experimental-commons/edit/main/",
      },
    }),
  ],
});
