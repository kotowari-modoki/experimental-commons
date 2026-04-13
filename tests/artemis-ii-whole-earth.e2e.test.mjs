// ABOUTME: Checks the Artemis II article reads as a complete mission summary with embedded source images.
// ABOUTME: Acts as a lightweight end-to-end contract for the reader-facing Whole Earth connection.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const articlePath = new URL('src/content/docs/history/artemis-ii-whole-earth.md', root);

test('Artemis II article includes mission structure, images, and Whole Earth context', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /## ミッションの概要/);
	assert.match(content, /## 経緯/);
	assert.match(content, /## 達成したこと/);
	assert.match(content, /## Whole Earth への接続/);
	assert.match(content, /!\[Artemis II Launch\]/);
	assert.match(content, /!\[Orion approaching Earthset behind the Moon\]/);
	assert.match(content, /!\[Moon and Earth seen from Orion\]/);
	assert.match(content, /Stewart Brand/);
	assert.match(content, /access to tools/);
	assert.match(content, /https:\/\/www\.youtube\.com\/watch\?v=6uOqqPupSyA/);
});
