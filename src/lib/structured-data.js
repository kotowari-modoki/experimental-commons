// ABOUTME: Builds Schema.org JSON-LD graphs and article Open Graph metadata for SEO and AIO.
// ABOUTME: Maps repository frontmatter fields (date, tags, author, provenance) to structured data.
import { formatPageDate } from '../components/page-metadata.js';

export const SITE_NAME = 'experimental-commons';
export const SITE_DESCRIPTION = 'まだ本になっていない知識の公共財';
export const SITE_LICENSE = 'https://creativecommons.org/licenses/by/4.0/';
export const REPO_URL = 'https://github.com/kotowari-modoki/experimental-commons';

/** @type {Record<string, string>} */
const SECTION_TOPIC_PATHS = {
	ai: 'topics/ai-agents/',
	arts: 'topics/culture-history/',
	books: 'topics/culture-history/',
	guides: 'topics/practical-guides/',
	history: 'topics/culture-history/',
	math: 'topics/science-systems/',
	philosophy: 'topics/philosophy-thought/',
	reference: 'topics/publishing/',
	research: 'research/',
	science: 'topics/science-systems/',
	web3: 'topics/web3-governance/',
};

/** @type {Record<string, string>} */
export const SECTION_LABELS = {
	ai: 'AI & Agents',
	arts: 'Culture & History',
	books: 'Culture & History',
	guides: 'Practical Guides',
	history: 'Culture & History',
	math: 'Science & Systems',
	philosophy: 'Philosophy & Thought',
	reference: 'Publishing',
	research: 'Research & Papers',
	science: 'Science & Systems',
	web3: 'web3 & Governance',
};

/**
 * @typedef {{
 *   id: string;
 *   data: {
 *     title: string;
 *     description?: string;
 *     date?: Date | string;
 *     status?: string;
 *     tags?: string[];
 *     author?: 'ai' | 'human';
 *     provenance?: {
 *       source_type?: string;
 *       source_ref?: string | string[];
 *       confidence?: string;
 *     };
 *   };
 * }} DocEntry
 */

/** @param {URL | string} site @param {string} base */
export function buildSiteUrl(site, base, path = '') {
	const normalizedBase = base.replace(/\/$/, '');
	const normalizedPath = path.replace(/^\//, '');
	return new URL(`${normalizedBase}/${normalizedPath}`, site).href;
}

/** @param {string | string[] | undefined} sourceRef @returns {string[]} */
function extractCitationUrls(sourceRef) {
	if (!sourceRef) return [];
	const items = Array.isArray(sourceRef) ? sourceRef : [sourceRef];
	const urls = [];
	for (const item of items) {
		const matches = String(item).match(/https?:\/\/[^\s)>"']+/g);
		if (matches) urls.push(...matches);
	}
	return Array.from(new Set(urls));
}

/**
 * @param {{
 *   entry: DocEntry;
 *   url: string;
 *   site: URL | string;
 *   base: string;
 *   imageUrl?: string;
 * }} params
 */
export function buildDocJsonLd({ entry, url, site, base, imageUrl }) {
	if (entry.id === '404') return null;

	const homeUrl = buildSiteUrl(site, base);
	const orgId = `${homeUrl}#organization`;
	const websiteId = `${homeUrl}#website`;

	if (entry.id === '' || entry.id === 'index') {
		return {
			'@context': 'https://schema.org',
			'@graph': [
				{
					'@type': 'WebSite',
					'@id': websiteId,
					name: SITE_NAME,
					url: homeUrl,
					description: entry.data.description ?? SITE_DESCRIPTION,
					inLanguage: 'ja',
					license: SITE_LICENSE,
					publisher: { '@id': orgId },
				},
				{
					'@type': 'Organization',
					'@id': orgId,
					name: SITE_NAME,
					url: homeUrl,
					sameAs: [REPO_URL],
				},
			],
		};
	}

	const date = formatPageDate(entry.data.date);
	const citations = extractCitationUrls(entry.data.provenance?.source_ref);
	const sectionKey = entry.id.split('/')[0];
	const sectionLabel = SECTION_LABELS[sectionKey];

	/** @type {Record<string, unknown>} */
	const article = {
		'@type': 'Article',
		headline: entry.data.title,
		description: entry.data.description ?? SITE_DESCRIPTION,
		url,
		mainEntityOfPage: { '@type': 'WebPage', '@id': url },
		inLanguage: 'ja',
		license: SITE_LICENSE,
		isPartOf: { '@type': 'WebSite', '@id': websiteId, name: SITE_NAME, url: homeUrl },
		publisher: { '@type': 'Organization', '@id': orgId, name: SITE_NAME, url: homeUrl },
		author: {
			'@type': 'Organization',
			name:
				entry.data.author === 'ai'
					? `${SITE_NAME} (AI-assisted draft, human-edited)`
					: SITE_NAME,
			url: homeUrl,
		},
	};

	if (imageUrl) article.image = imageUrl;
	if (date) {
		article.datePublished = date;
		article.dateModified = date;
	}
	if (entry.data.tags && entry.data.tags.length > 0) {
		article.keywords = entry.data.tags;
	}
	if (citations.length > 0) {
		article.citation = citations;
	}

	const breadcrumbItems = [
		{ '@type': 'ListItem', position: 1, name: SITE_NAME, item: homeUrl },
	];
	if (sectionLabel && entry.id.includes('/')) {
		const topicPath = SECTION_TOPIC_PATHS[sectionKey];
		breadcrumbItems.push({
			'@type': 'ListItem',
			position: 2,
			name: sectionLabel,
			...(topicPath ? { item: buildSiteUrl(site, base, topicPath) } : {}),
		});
	}
	breadcrumbItems.push({
		'@type': 'ListItem',
		position: breadcrumbItems.length + 1,
		name: entry.data.title,
		item: url,
	});

	return {
		'@context': 'https://schema.org',
		'@graph': [
			article,
			{
				'@type': 'BreadcrumbList',
				itemListElement: breadcrumbItems,
			},
		],
	};
}

/**
 * @param {{
 *   tag: string;
 *   entries: Array<{ id: string; data: { title: string } }>;
 *   url: string;
 *   site: URL | string;
 *   base: string;
 * }} params
 */
export function buildTagJsonLd({ tag, entries, url, site, base }) {
	const homeUrl = buildSiteUrl(site, base);
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'CollectionPage',
				name: `#${tag}`,
				description: `「${tag}」に関連する、実験中の知識をたどる。`,
				url,
				inLanguage: 'ja',
				isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: homeUrl },
				mainEntity: {
					'@type': 'ItemList',
					numberOfItems: entries.length,
					itemListElement: entries.map((entry, index) => ({
						'@type': 'ListItem',
						position: index + 1,
						name: entry.data.title,
						url: buildSiteUrl(site, base, `${entry.id}/`),
					})),
				},
			},
			{
				'@type': 'BreadcrumbList',
				itemListElement: [
					{ '@type': 'ListItem', position: 1, name: SITE_NAME, item: homeUrl },
					{ '@type': 'ListItem', position: 2, name: `#${tag}`, item: url },
				],
			},
		],
	};
}

/**
 * @param {{
 *   topic: { slug: string; label: string; description: string };
 *   entries: Array<{ id: string; data: { title: string } }>;
 *   url: string;
 *   site: URL | string;
 *   base: string;
 * }} params
 */
export function buildTopicJsonLd({ topic, entries, url, site, base }) {
	const homeUrl = buildSiteUrl(site, base);
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'CollectionPage',
				name: topic.label,
				description: topic.description,
				url,
				inLanguage: 'ja',
				isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: homeUrl },
				mainEntity: {
					'@type': 'ItemList',
					numberOfItems: entries.length,
					itemListElement: entries.map((entry, index) => ({
						'@type': 'ListItem',
						position: index + 1,
						name: entry.data.title,
						url: buildSiteUrl(site, base, `${entry.id}/`),
					})),
				},
			},
			{
				'@type': 'BreadcrumbList',
				itemListElement: [
					{ '@type': 'ListItem', position: 1, name: SITE_NAME, item: homeUrl },
					{ '@type': 'ListItem', position: 2, name: topic.label, item: url },
				],
			},
		],
	};
}

/**
 * @param {{ id: string; data: { date?: Date | string; tags?: string[] } }} entry
 * @returns {Array<{ property: string; content: string }>}
 */
export function getArticleMetaTags(entry) {
	if (entry.id === '' || entry.id === 'index' || entry.id === '404') return [];
	/** @type {Array<{ property: string; content: string }>} */
	const tags = [];
	const date = formatPageDate(entry.data.date);
	if (date) {
		tags.push({ property: 'article:published_time', content: date });
	}
	for (const tag of entry.data.tags ?? []) {
		tags.push({ property: 'article:tag', content: tag });
	}
	return tags;
}

/** @param {unknown} data */
export function serializeJsonLd(data) {
	return JSON.stringify(data).replace(/</g, '\\u003c');
}
