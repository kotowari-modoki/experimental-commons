// ABOUTME: Verifies the status emoji mapping for the page metadata status badge.
// ABOUTME: Ensures each status value maps to the correct emoji prefix.
import test from 'node:test';
import assert from 'node:assert/strict';

import { getStatusEmoji, getPageMetadata } from '../src/components/page-metadata.js';

test('getStatusEmoji returns emoji for each status value', () => {
	assert.equal(getStatusEmoji('seed'), '🌱');
	assert.equal(getStatusEmoji('growing'), '🌿');
	assert.equal(getStatusEmoji('evergreen'), '🌳');
});

test('getStatusEmoji returns empty string for unknown status', () => {
	assert.equal(getStatusEmoji(undefined), '');
	assert.equal(getStatusEmoji(''), '');
});

test('getPageMetadata includes emoji in status value', () => {
	const metadata = getPageMetadata({
		status: 'seed',
		date: new Date('2026-03-31T00:00:00.000Z'),
	});

	const statusItem = metadata.find((m) => m.label === 'status');
	assert.equal(statusItem.value, '🌱 seed');
});

test('getPageMetadata includes emoji for growing status', () => {
	const metadata = getPageMetadata({ status: 'growing' });
	const statusItem = metadata.find((m) => m.label === 'status');
	assert.equal(statusItem.value, '🌿 growing');
});

test('getPageMetadata includes emoji for evergreen status', () => {
	const metadata = getPageMetadata({ status: 'evergreen' });
	const statusItem = metadata.find((m) => m.label === 'status');
	assert.equal(statusItem.value, '🌳 evergreen');
});
