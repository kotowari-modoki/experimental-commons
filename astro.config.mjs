// ABOUTME: Configures the Astro/Starlight documentation site for experimental-commons.
// ABOUTME: Defines site metadata, sidebar navigation, and editing links for published docs.
// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeGalaxy from "starlight-theme-galaxy";

export default defineConfig({
  site: "https://kotowari-modoki.github.io/",
  base: "experimental-commons",
  integrations: [
    starlight({
      plugins: [starlightThemeGalaxy()],
      title: "experimental-commons",
      description: "まだ本になっていない知識の公共財",
      defaultLocale: "root",
      locales: {
        root: { label: "JA / EN", lang: "ja" },
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
          label: "Published",
          items: [
            {
              label: "Guide",
              link: "/guides/example/",
            },
            {
              label: "Reference",
              link: "/reference/example/",
            },
          ],
        },
        {
          label: "AI / Agents / LLM",
          autogenerate: { directory: "ai" },
        },
        {
          label: "Design",
          autogenerate: { directory: "design" },
        },
        {
          label: "Art & Computation",
          autogenerate: { directory: "art" },
        },
        {
          label: "Computer Science",
          autogenerate: { directory: "cs" },
        },
        {
          label: "Economics",
          autogenerate: { directory: "economics" },
        },
        {
          label: "Anthropology",
          autogenerate: { directory: "anthropology" },
        },
        {
          label: "Education",
          autogenerate: { directory: "education" },
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
