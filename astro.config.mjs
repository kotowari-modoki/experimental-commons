// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
	site: "https://kotowari-modoki.github.io/experimental-commons/",
	integrations: [
		starlight({
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
