// ABOUTME: Ensures the shipped favicon asset has its own opaque rounded tile for browser-tab contrast.
// ABOUTME: Acts as a lightweight end-to-end check for the public asset readers actually receive.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('favicon ships a rounded background tile instead of relying on browser chrome', async () => {
	const favicon = await readFile(new URL('public/favicon.svg', root), 'utf8');

	assert.match(favicon, /<rect[^>]+id="tile"/);
	assert.match(favicon, /rx="28"/);
	assert.doesNotMatch(favicon, /prefers-color-scheme/);
});
