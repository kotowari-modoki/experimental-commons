// ABOUTME: Generates llms.txt and llms-full.txt text corpora from published docs entries.
// ABOUTME: Provides structured discovery and clean Markdown access for AI search and agents.
import { formatPageDate } from '../components/page-metadata.js';
import {
	REPO_URL,
	SECTION_LABELS,
	SITE_DESCRIPTION,
	SITE_LICENSE,
	SITE_NAME,
	buildSiteUrl,
} from './structured-data.js';

const EXCLUDED_IDS = new Set(['', 'index', '404', 'research/journal-template']);

const SECTION_ORDER = [
	'Publishing',
	'Research & Papers',
	'AI & Agents',
	'Science & Systems',
	'web3 & Governance',
	'Philosophy & Thought',
	'Culture & History',
	'Practical Guides',
	'Other',
];

/**
 * @typedef {{
 *   id: string;
 *   body?: string;
 *   data: {
 *     title: string;
 *     description?: string;
 *     date?: Date | string;
 *     status?: string;
 *     draft?: boolean;
 *     tags?: string[];
 *     author?: 'ai' | 'human';
 *     provenance?: {
 *       source_type?: string;
 *       source_ref?: string | string[];
 *       confidence?: string;
 *     };
 *   };
 * }} CorpusDoc
 */

/** @param {Date | string | undefined} value */
function toTime(value) {
	if (!value) return -Infinity;
	const t = new Date(value).getTime();
	return Number.isNaN(t) ? -Infinity : t;
}

/** @param {CorpusDoc[]} docs */
export function getPublishedCorpusDocs(docs) {
	return docs
		.filter((entry) => !entry.data.draft && !EXCLUDED_IDS.has(entry.id))
		.sort((a, b) => toTime(b.data.date) - toTime(a.data.date));
}

/** @param {CorpusDoc[]} docs @param {URL | string} site @param {string} base */
export function buildLlmsTxt(docs, site, base) {
	const published = getPublishedCorpusDocs(docs);
	const homeUrl = buildSiteUrl(site, base);
	const fullUrl = buildSiteUrl(site, base, 'llms-full.txt');
	const sitemapUrl = buildSiteUrl(site, base, 'sitemap-index.xml');
	const rssUrl = buildSiteUrl(site, base, 'rss.xml');

	/** @type {Map<string, CorpusDoc[]>} */
	const groups = new Map();
	for (const entry of published) {
		const sectionKey = entry.id.split('/')[0];
		const label = SECTION_LABELS[sectionKey] ?? 'Other';
		const list = groups.get(label) ?? [];
		list.push(entry);
		groups.set(label, list);
	}

	const lines = [
		`# ${SITE_NAME}`,
		'',
		`> ${SITE_DESCRIPTION} — AI Agent が下書きを担い、人間が編集責任を持ちながら、実験中の知識・仮説・研究日誌を誠実なまま公開するナレッジベース。`,
		'',
		`- Home: ${homeUrl}`,
		`- Full Corpus: ${fullUrl}`,
		`- Sitemap: ${sitemapUrl}`,
		`- RSS Feed: ${rssUrl}`,
		`- Repository: ${REPO_URL}`,
		`- License: CC BY 4.0 (${SITE_LICENSE})`,
		'- Maturity Statuses: `seed` (芽が出たばかり・仮説/要検証), `growing` (育成中・随時更新), `evergreen` (比較的安定した知見)',
		'',
	];

	for (const section of SECTION_ORDER) {
		const entries = groups.get(section);
		if (!entries || entries.length === 0) continue;
		lines.push(`## ${section}`, '');
		for (const entry of entries) {
			const url = buildSiteUrl(site, base, `${entry.id}/`);
			const description = (entry.data.description ?? '').replace(/\s+/g, ' ').trim();
			const metaParts = [];
			if (entry.data.status) metaParts.push(`status: ${entry.data.status}`);
			const date = formatPageDate(entry.data.date);
			if (date) metaParts.push(`date: ${date}`);
			const metaSuffix = metaParts.length > 0 ? ` [${metaParts.join(', ')}]` : '';
			const descPart = description ? `: ${description}` : '';
			lines.push(`- [${entry.data.title}](${url})${descPart}${metaSuffix}`);
		}
		lines.push('');
	}

	return lines.join('\n');
}

/** @param {CorpusDoc[]} docs @param {URL | string} site @param {string} base */
export function buildLlmsFullTxt(docs, site, base) {
	const published = getPublishedCorpusDocs(docs);
	const homeUrl = buildSiteUrl(site, base);
	const indexUrl = buildSiteUrl(site, base, 'llms.txt');

	const chunks = [
		`# ${SITE_NAME} — Full Corpus`,
		'',
		`> ${SITE_DESCRIPTION}`,
		'',
		`- Home: ${homeUrl}`,
		`- Index: ${indexUrl}`,
		`- License: CC BY 4.0 (${SITE_LICENSE})`,
		`- Published Documents: ${published.length}`,
		'',
	];

	for (const entry of published) {
		const url = buildSiteUrl(site, base, `${entry.id}/`);
		const date = formatPageDate(entry.data.date);
		const metaLines = [
			'---',
			'',
			`# ${entry.data.title}`,
			'',
			`- URL: ${url}`,
		];
		if (date) metaLines.push(`- Date: ${date}`);
		if (entry.data.status) metaLines.push(`- Status: ${entry.data.status}`);
		if (entry.data.author) metaLines.push(`- Author: ${entry.data.author}`);
		if (entry.data.tags && entry.data.tags.length > 0) {
			metaLines.push(`- Tags: ${entry.data.tags.join(', ')}`);
		}
		if (entry.data.provenance?.source_type) {
			metaLines.push(`- Source Type: ${entry.data.provenance.source_type}`);
		}
		if (entry.data.provenance?.confidence) {
			metaLines.push(`- Confidence: ${entry.data.provenance.confidence}`);
		}
		if (entry.data.description) {
			metaLines.push(`- Description: ${entry.data.description}`);
		}
		metaLines.push('');
		if (entry.body) {
			metaLines.push(entry.body.trim(), '');
		}
		chunks.push(metaLines.join('\n'));
	}

	return chunks.join('\n');
}
