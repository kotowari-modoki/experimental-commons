// ABOUTME: Builds a dependency-free RSS 2.0 feed for recently updated published articles.
// ABOUTME: Escapes XML entities safely and excludes drafts and system pages.
import {
	SITE_DESCRIPTION,
	SITE_NAME,
	buildSiteUrl,
} from './structured-data.js';
import { getPublishedCorpusDocs } from './llms.js';

/** @param {string} value */
export function escapeXml(value) {
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

/**
 * @param {import('./llms.js').CorpusDoc[]} docs
 * @param {URL | string} site
 * @param {string} base
 * @param {number} [limit]
 */
export function buildRssXml(docs, site, base, limit = 50) {
	const items = getPublishedCorpusDocs(docs).slice(0, limit);
	const homeUrl = buildSiteUrl(site, base);
	const feedUrl = buildSiteUrl(site, base, 'rss.xml');
	const latestDate = items[0]?.data.date ? new Date(items[0].data.date) : new Date();
	const lastBuildDate = Number.isNaN(latestDate.getTime())
		? new Date().toUTCString()
		: latestDate.toUTCString();

	const itemXml = items
		.map((entry) => {
			const link = buildSiteUrl(site, base, `${entry.id}/`);
			const date = entry.data.date ? new Date(entry.data.date) : null;
			const pubDate = date && !Number.isNaN(date.getTime()) ? date.toUTCString() : null;
			const categories = (entry.data.tags ?? [])
				.map((tag) => `      <category>${escapeXml(tag)}</category>`)
				.join('\n');

			return [
				'    <item>',
				`      <title>${escapeXml(entry.data.title)}</title>`,
				`      <link>${escapeXml(link)}</link>`,
				`      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
				`      <description>${escapeXml(entry.data.description ?? SITE_DESCRIPTION)}</description>`,
				pubDate ? `      <pubDate>${escapeXml(pubDate)}</pubDate>` : null,
				categories || null,
				'    </item>',
			]
				.filter(Boolean)
				.join('\n');
		})
		.join('\n');

	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
		'  <channel>',
		`    <title>${escapeXml(SITE_NAME)}</title>`,
		`    <link>${escapeXml(homeUrl)}</link>`,
		`    <description>${escapeXml(SITE_DESCRIPTION)}</description>`,
		'    <language>ja</language>',
		`    <lastBuildDate>${escapeXml(lastBuildDate)}</lastBuildDate>`,
		`    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
		itemXml,
		'  </channel>',
		'</rss>',
		'',
	].join('\n');
}
