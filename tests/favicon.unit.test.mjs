// ABOUTME: Verifies the favicon SVG keeps the core experimental-commons mark anatomy intact.
// ABOUTME: Protects the book-and-sprout silhouette so small browser tabs stay recognizable.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('favicon defines the expected emblem parts', async () => {
	const favicon = await readFile(new URL('public/favicon.svg', root), 'utf8');

	assert.match(favicon, /viewBox="0 0 128 128"/);
	assert.match(favicon, /id="tile"/);
	assert.match(favicon, /id="book"/);
	assert.match(favicon, /id="sprout-stem"/);
	assert.match(favicon, /id="leaf-left"/);
	assert.match(favicon, /id="leaf-right"/);
	assert.match(favicon, /id="bud"/);
});
