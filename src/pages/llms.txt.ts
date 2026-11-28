// ABOUTME: Serves the static llms.txt index for AI search engines and agent readers.
// ABOUTME: Built at compile time from the docs content collection with zero runtime cost.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildLlmsTxt } from '../lib/llms.js';

export const GET: APIRoute = async ({ site }) => {
	const docs = await getCollection('docs');
	const body = buildLlmsTxt(docs, site ?? 'https://kotowari-modoki.github.io/', import.meta.env.BASE_URL);
	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
