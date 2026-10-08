// ABOUTME: Derives social-card content and cacheable image URLs from page metadata.
// ABOUTME: Shares one contract between static image endpoints and HTML head tags.
import { createHash } from 'node:crypto';
import { formatPageDate } from '../components/page-metadata.js';

export const IMAGE_WIDTH = 1200;
export const IMAGE_HEIGHT = 630;
// Bump when the renderer, favicon, or bundled font changes to refresh social caches.
const TEMPLATE_VERSION = 1;

/** @typedef {{ title: string, description: string, section: string, status: string, date: string }} SocialImage */
/** @typedef {{ tag: string, attrs?: Record<string, string | boolean | undefined> }} HeadTag */
/** @typedef {{ id: string, data: { title: string, description?: string, status?: string, date?: Date, draft?: boolean, tags?: string[] } }} Document */

/** @type {Record<string, string>} */
const SECTIONS = {
	ai: 'AI & AGENTS',
	arts: 'ARTS & CULTURE',
	books: 'BOOKS & IDEAS',
	guides: 'PRACTICAL GUIDES',
	history: 'CULTURE & HISTORY',
	math: 'SCIENCE & SYSTEMS',
	philosophy: 'PHILOSOPHY & THOUGHT',
	reference: 'THE COMMONS',
	research: 'RESEARCH JOURNAL',
	science: 'SCIENCE & SYSTEMS',
	web3: 'WEB3 & GOVERNANCE',
};

/**
 * @param {Document} entry
 * @returns {SocialImage}
 */
export function createDocImage({ id, data }) {
	return {
		title: data.title,
		description: data.description ?? 'まだ本になっていない知識の公共財',
		section: SECTIONS[id.split('/')[0]] ?? 'KNOWLEDGE IN PROGRESS',
		status: data.status ?? '',
		date: formatPageDate(data.date) ?? '',
	};
}

/** @param {string} tag @returns {SocialImage} */
export function createTagImage(tag) {
	return {
		title: `#${tag}`,
		description: `「${tag}」に関連する、実験中の知識をたどる。`,
		section: 'EXPLORE THE COMMONS',
		status: '',
		date: '',
	};
}

/** @param {Document[]} docs @param {boolean} includeDrafts */
export function getCollectionImages(docs, includeDrafts = false) {
	// Match Starlight's production draft policy; PNG files are public assets too.
	const articles = docs.filter(({ data }) => includeDrafts || !data.draft);
	// Tag index routes currently cover the full collection, including draft tags.
	const tags = new Set(docs.flatMap(({ data }) => data.tags ?? []));
	return [...articles.map(createDocImage), ...Array.from(tags, createTagImage)];
}

/** @param {SocialImage} image */
export function getImageId({ title, description, section, status, date }) {
	return createHash('sha256')
		.update(JSON.stringify([TEMPLATE_VERSION, title, description, section, status, date]))
		.digest('hex').slice(0, 24);
}

/** @param {SocialImage} image @param {URL | string} site @param {string} base */
export function getImageUrl(image, site, base) {
	return new URL(`${base.replace(/\/$/, '')}/og/${getImageId(image)}.png`, site).href;
}

/**
 * @param {SocialImage} image
 * @param {URL | string} site
 * @param {string} base
 * @param {HeadTag[]} existing
 * @returns {Array<{ tag: 'meta', attrs: Record<string, string> }>}
 */
export function getImageTags(image, site, base, existing = []) {
	const find = (/** @type {string} */ key) => existing.find(
		({ tag, attrs }) => tag === 'meta' && (attrs?.property === key || attrs?.name === key),
	);
	const customImage = find('og:image');
	const customTwitter = find('twitter:image');
	const url = getImageUrl(image, site, base);
	/** @type {Array<{ tag: 'meta', attrs: Record<string, string> }>} */
	const tags = [];
	if (!customImage) {
		for (const [property, content] of Object.entries({
			'og:image': url,
			'og:image:type': 'image/png',
			'og:image:width': String(IMAGE_WIDTH),
			'og:image:height': String(IMAGE_HEIGHT),
			'og:image:alt': image.title,
		})) {
			if (!find(property)) tags.push({ tag: 'meta', attrs: { property, content } });
		}
	}
	if (!customTwitter) {
		tags.push({ tag: 'meta', attrs: {
			name: 'twitter:image', content: String(customImage?.attrs?.content ?? url),
		} });
		if (!customImage && !find('twitter:image:alt')) {
			tags.push({ tag: 'meta', attrs: { name: 'twitter:image:alt', content: image.title } });
		}
	}
	return tags;
}
