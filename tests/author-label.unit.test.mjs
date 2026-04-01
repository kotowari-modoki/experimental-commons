// ABOUTME: Verifies that the author field is included in page metadata output.
// ABOUTME: Ensures AI-authored pages get a visible label in the article header.
import test from 'node:test';
import assert from 'node:assert/strict';

import { getPageMetadata } from '../src/components/page-metadata.js';

test('getPageMetadata includes AI draft label when author is ai', () => {
	const metadata = getPageMetadata({ author: 'ai' });
	const authorItem = metadata.find((m) => m.label === 'author');
	assert.ok(authorItem, 'author item should exist');
	assert.equal(authorItem.value, '🤖 AI draft');
});

test('getPageMetadata omits author label when author is not set', () => {
	const metadata = getPageMetadata({ status: 'seed' });
	const authorItem = metadata.find((m) => m.label === 'author');
	assert.equal(authorItem, undefined);
});

test('getPageMetadata omits author label when author is human', () => {
	const metadata = getPageMetadata({ author: 'human' });
	const authorItem = metadata.find((m) => m.label === 'author');
	assert.equal(authorItem, undefined);
});

test('getPageMetadata returns status then author then date in that order', () => {
	const metadata = getPageMetadata({
		status: 'seed',
		author: 'ai',
		date: new Date('2026-04-01T00:00:00.000Z'),
	});

	assert.deepEqual(metadata, [
		{ label: 'status', value: '🌱 seed' },
		{ label: 'author', value: '🤖 AI draft' },
		{ label: 'date', value: '2026-04-01' },
	]);
});
