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
