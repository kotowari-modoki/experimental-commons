// ABOUTME: Provides topic definitions, breadcrumbs, related-page ranking, and tag directory helpers.
// ABOUTME: Keeps usability and internal-linking logic pure, deterministic, and testable.
import { SECTION_LABELS } from './structured-data.js';

const EXCLUDED_IDS = new Set(['', 'index', '404', 'research/journal-template']);

/**
 * @typedef {{
 *   slug: string;
 *   label: string;
 *   description: string;
 *   prefixes: string[];
 * }} TopicDefinition
 */

/** @type {TopicDefinition[]} */
export const TOPICS = [
	{
		slug: 'publishing',
		label: 'Publishing',
		description: 'frontmatter スキーマ、provenance、編集方針、CC BY 4.0 ライセンスなど公開基盤の参照。',
		prefixes: ['reference'],
	},
	{
		slug: 'ai-agents',
		label: 'AI & Agents',
		description: 'AI エージェント設計、ローカル LLM、セキュリティ事例、知識獲得ワークフローの実験記録。',
		prefixes: ['ai'],
	},
	{
		slug: 'science-systems',
		label: 'Science & Systems',
		description: '意識研究、数学・形式検証、神経科学、量子計算など科学とシステムの探究ノート。',
		prefixes: ['science', 'math'],
	},
	{
		slug: 'web3-governance',
		label: 'web3 & Governance',
		description: '分散プロトコル、OSS 報酬設計、HTTP 決済標準などガバナンスと経済設計のメモ。',
		prefixes: ['web3'],
	},
	{
		slug: 'philosophy-thought',
		label: 'Philosophy & Thought',
		description: '哲学史、仏教思想、言語の限界、労働と活動など思想の補助線をたどるノート。',
		prefixes: ['philosophy'],
	},
	{
		slug: 'culture-history',
		label: 'Culture & History',
		description: '古典・歴史・文学・工芸・語学・ゲーム史など文化と歴史の見取り図。',
		prefixes: ['arts', 'books', 'history'],
	},
	{
		slug: 'practical-guides',
		label: 'Practical Guides',
		description: 'Tailscale、chezmoi、Herdr などの実践ガイドと日々のハンズオン手順。',
		prefixes: ['guides'],
	},
];

/** @param {string} prefix @returns {TopicDefinition | undefined} */
export function getTopicForPrefix(prefix) {
	return TOPICS.find((topic) => topic.prefixes.includes(prefix));
}

/** @param {Date | string | undefined} value */
function toTime(value) {
	if (!value) return -Infinity;
	const t = new Date(value).getTime();
	return Number.isNaN(t) ? -Infinity : t;
}

/**
 * @template {{ id: string; data: { date?: Date | string; draft?: boolean } }} T
 * @param {T[]} docs
 * @param {TopicDefinition} topic
 * @returns {T[]}
 */
export function getTopicDocs(docs, topic) {
	return docs
		.filter(
			(entry) =>
				!entry.data.draft &&
				!EXCLUDED_IDS.has(entry.id) &&
				topic.prefixes.includes(entry.id.split('/')[0]),
		)
		.sort((a, b) => toTime(b.data.date) - toTime(a.data.date));
}

/**
 * @param {{ id: string }} entry
 * @param {string} base
 * @returns {Array<{ label: string; href: string | null }>}
 */
export function buildBreadcrumbs(entry, base) {
	if (!entry.id || entry.id === 'index' || entry.id === '404') {
		return [];
	}

	const normalizedBase = base.replace(/\/$/, '');
	/** @type {Array<{ label: string; href: string | null }>} */
	const crumbs = [{ label: 'Top', href: `${normalizedBase}/` }];
	const parts = entry.id.split('/');

	if (parts[0] === 'research') {
		if (parts.length >= 2) {
			crumbs.push({
				label: 'Research & Papers',
				href: `${normalizedBase}/research/`,
			});
		}
		if (parts.length >= 4 && parts[2] === 'journal') {
			crumbs.push({
				label: parts[1],
				href: `${normalizedBase}/research/${parts[1]}/`,
			});
		}
		return crumbs;
	}

	const topic = getTopicForPrefix(parts[0]);
	if (topic && parts.length >= 2) {
		crumbs.push({
			label: topic.label,
			href: `${normalizedBase}/topics/${topic.slug}/`,
		});
		return crumbs;
	}

	const sectionLabel = SECTION_LABELS[parts[0]];
	if (sectionLabel && parts.length >= 2) {
		crumbs.push({ label: sectionLabel, href: null });
	}

	return crumbs;
}

/**
 * @template {{ id: string; data: { date?: Date | string; draft?: boolean; tags?: string[] } }} T
 * @param {T[]} docs
 * @param {string} currentSlug
 * @param {string[]} tags
 * @param {number} [limit]
 * @returns {T[]}
 */
export function selectRelatedDocs(docs, currentSlug, tags, limit = 4) {
	if (!tags || tags.length === 0) return [];
	const tagSet = new Set(tags);

	return docs
		.filter((entry) => !entry.data.draft && !EXCLUDED_IDS.has(entry.id) && entry.id !== currentSlug)
		.map((entry) => {
			const overlap = (entry.data.tags ?? []).reduce(
				(count, tag) => (tagSet.has(tag) ? count + 1 : count),
				0,
			);
			return { entry, overlap };
		})
		.filter(({ overlap }) => overlap > 0)
		.sort((a, b) => {
			if (b.overlap !== a.overlap) return b.overlap - a.overlap;
			return toTime(b.entry.data.date) - toTime(a.entry.data.date);
		})
		.slice(0, limit)
		.map(({ entry }) => entry);
}

/**
 * @param {Array<{ id: string; data: { draft?: boolean; tags?: string[] } }>} docs
 * @returns {Array<{ tag: string; count: number }>}
 */
export function buildTagDirectory(docs) {
	/** @type {Map<string, number>} */
	const counts = new Map();
	for (const entry of docs) {
		if (entry.data.draft || EXCLUDED_IDS.has(entry.id)) continue;
		for (const tag of entry.data.tags ?? []) {
			counts.set(tag, (counts.get(tag) ?? 0) + 1);
		}
	}

	return Array.from(counts, ([tag, count]) => ({ tag, count })).sort((a, b) => {
		if (b.count !== a.count) return b.count - a.count;
		return a.tag.localeCompare(b.tag);
	});
}
