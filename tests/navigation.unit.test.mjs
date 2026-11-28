// ABOUTME: Verifies breadcrumb generation, related-article ranking, and tag directory aggregation.
// ABOUTME: Protects site navigation helpers without requiring a full Astro runtime.
import test from 'node:test';
import assert from 'node:assert/strict';

import {
	buildBreadcrumbs,
	buildTagDirectory,
	selectRelatedDocs,
} from '../src/lib/navigation.js';

const BASE = '/experimental-commons';

test('buildBreadcrumbs returns empty array for home and 404 pages', () => {
	assert.deepEqual(buildBreadcrumbs({ id: '' }, BASE), []);
	assert.deepEqual(buildBreadcrumbs({ id: 'index' }, BASE), []);
	assert.deepEqual(buildBreadcrumbs({ id: '404' }, BASE), []);
});

test('buildBreadcrumbs links parent research index and project page for journal entries', () => {
	const crumbs = buildBreadcrumbs(
		{ id: 'research/conspiracy-family-transmission/journal/2026-07-13-v11-to-v12' },
		BASE,
	);

	assert.deepEqual(crumbs, [
		{ label: 'Top', href: '/experimental-commons/' },
		{ label: 'Research & Papers', href: '/experimental-commons/research/' },
		{
			label: 'conspiracy-family-transmission',
			href: '/experimental-commons/research/conspiracy-family-transmission/',
		},
	]);
});

test('buildBreadcrumbs links section label for standard articles', () => {
	const crumbs = buildBreadcrumbs({ id: 'ai/agents/openclaw-setup' }, BASE);

	assert.deepEqual(crumbs, [
		{ label: 'Top', href: '/experimental-commons/' },
		{ label: 'AI & Agents', href: null },
	]);
});

test('selectRelatedDocs ranks by tag overlap then date descending and excludes drafts/system pages', () => {
	const docs = [
		{ id: 'current', data: { title: 'Current', date: new Date('2026-05-01'), tags: ['ai', 'agents'] } },
		{ id: 'draft', data: { title: 'Draft', date: new Date('2026-09-01'), draft: true, tags: ['ai', 'agents'] } },
		{ id: '404', data: { title: '404', date: new Date('2026-09-01'), tags: ['ai'] } },
		{ id: 'one-match-new', data: { title: 'One New', date: new Date('2026-08-01'), tags: ['ai'] } },
		{ id: 'two-match-old', data: { title: 'Two Old', date: new Date('2026-02-01'), tags: ['ai', 'agents'] } },
		{ id: 'two-match-new', data: { title: 'Two New', date: new Date('2026-06-01'), tags: ['ai', 'agents'] } },
		{ id: 'no-match', data: { title: 'No Match', date: new Date('2026-09-01'), tags: ['cooking'] } },
	];

	const related = selectRelatedDocs(docs, 'current', ['ai', 'agents'], 3);
	assert.deepEqual(
		related.map((entry) => entry.id),
		['two-match-new', 'two-match-old', 'one-match-new'],
	);
});

test('buildTagDirectory counts published tags and sorts by count descending then alphabetically', () => {
	const docs = [
		{ id: 'a', data: { tags: ['ai', 'math'] } },
		{ id: 'b', data: { tags: ['ai', 'agents'] } },
		{ id: 'draft', data: { draft: true, tags: ['secret'] } },
		{ id: '404', data: { tags: ['site'] } },
	];

	assert.deepEqual(buildTagDirectory(docs), [
		{ tag: 'ai', count: 2 },
		{ tag: 'agents', count: 1 },
		{ tag: 'math', count: 1 },
	]);
});
