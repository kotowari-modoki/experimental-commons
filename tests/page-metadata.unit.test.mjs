// ABOUTME: Verifies the page metadata helper formats status and dates for article headers.
// ABOUTME: Keeps the status badge contract stable without requiring an Astro runtime.
import test from 'node:test';
import assert from 'node:assert/strict';

import { formatPageDate, getPageMetadata } from '../src/components/page-metadata.js';

test('getPageMetadata returns visible status and date items', () => {
	const metadata = getPageMetadata({
		status: 'seed',
		date: new Date('2026-03-28T00:00:00.000Z'),
	});

	assert.deepEqual(metadata, [
		{ label: 'status', value: '🌱 seed' },
		{ label: 'date', value: '2026-03-28' },
	]);
});

test('formatPageDate preserves the frontmatter calendar date', () => {
	assert.equal(formatPageDate(new Date('2026-03-28T00:00:00.000Z')), '2026-03-28');
});

test('getPageMetadata omits empty values', () => {
	assert.deepEqual(getPageMetadata({}), []);
});
