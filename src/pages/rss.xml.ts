// ABOUTME: Serves an RSS 2.0 feed of published articles ordered by frontmatter date.
// ABOUTME: Supports feed readers, search discovery, and automated aggregators.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildRssXml } from '../lib/rss.js';

export const GET: APIRoute = async ({ site }) => {
	const docs = await getCollection('docs');
	const xml = buildRssXml(docs, site ?? 'https://kotowari-modoki.github.io/', import.meta.env.BASE_URL);
	return new Response(xml, {
		headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
	});
};
