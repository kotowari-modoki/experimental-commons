// ABOUTME: Provides breadcrumb, related-page ranking, and tag directory helpers for site navigation.
// ABOUTME: Keeps usability and internal-linking logic pure, deterministic, and testable.
import { SECTION_LABELS } from './structured-data.js';

const EXCLUDED_IDS = new Set(['', 'index', '404', 'research/journal-template']);

/** @param {Date | string | undefined} value */
function toTime(value) {
	if (!value) return -Infinity;
	const t = new Date(value).getTime();
	return Number.isNaN(t) ? -Infinity : t;
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
