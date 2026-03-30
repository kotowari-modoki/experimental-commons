// ABOUTME: Configures Astro and Starlight for the experimental-commons documentation site.
// ABOUTME: Defines site metadata, navigation, and edit links for the published knowledge garden.
// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeGalaxy from "starlight-theme-galaxy";

export default defineConfig({
  site: "https://kotowari-modoki.github.io/",
  base: "/experimental-commons",
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
              label: "プロバビリスティックプログラミング入門",
              link: "/ai/prob-comp/probabilistic-programming-intro/",
            },
            {
              label: "Contributing Guide",
              link: "/guides/contributing/",
            },
            {
              label: "Content Schema",
              link: "/reference/content-schema/",
            },
            {
              label: "CC BY 4.0 の案内",
              link: "/reference/license-cc-by-4-0/",
            },
          ],
        },
        {
          label: "Guides",
          autogenerate: { directory: "guides" },
        },
        {
          label: "Books",
          autogenerate: { directory: "books" },
        },
        {
          label: "Math",
          autogenerate: { directory: "math" },
        },
        {
          label: "AI",
          autogenerate: { directory: "ai" },
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
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
