// ABOUTME: Checks the favicon SVG uses the project palette rather than the default monochrome mark.
// ABOUTME: Keeps the icon visually aligned with the site's warm-paper and dark-ink direction.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('favicon uses the experimental-commons palette', async () => {
	const favicon = await readFile(new URL('public/favicon.svg', root), 'utf8');

	assert.match(favicon, /#102033/i);
	assert.match(favicon, /#F8F1E5/i);
	assert.match(favicon, /#F4B942/i);
	assert.match(favicon, /#58B09C/i);
	assert.match(favicon, /#E76F51/i);
});
