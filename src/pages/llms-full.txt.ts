// ABOUTME: Serves the full plain-text Markdown corpus at llms-full.txt for LLM ingestion.
// ABOUTME: Excludes drafts and system pages while preserving frontmatter metadata.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildLlmsFullTxt } from '../lib/llms.js';

export const GET: APIRoute = async ({ site }) => {
	const docs = await getCollection('docs');
	const body = buildLlmsFullTxt(docs, site ?? 'https://kotowari-modoki.github.io/', import.meta.env.BASE_URL);
	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
