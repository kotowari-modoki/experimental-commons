// ABOUTME: Serves clean Markdown with structured metadata for every published article at /<slug>.md.
// ABOUTME: Enables direct LLM ingestion, citation, and one-click copy workflows without HTML noise.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { formatDocMarkdown, getPublishedCorpusDocs, type CorpusDoc } from '../lib/llms.js';

export const getStaticPaths: GetStaticPaths = async () => {
	const docs = getPublishedCorpusDocs(await getCollection('docs'));
	return docs.map((entry) => ({
		params: { slug: entry.id },
		props: { entry },
	}));
};

export const GET: APIRoute = async ({ props, site }) => {
	const body = formatDocMarkdown(
		props.entry as CorpusDoc,
		site ?? 'https://kotowari-modoki.github.io/',
		import.meta.env.BASE_URL,
	);
	return new Response(body, {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
	});
};
