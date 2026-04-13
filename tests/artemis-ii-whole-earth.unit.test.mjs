// ABOUTME: Verifies the Artemis II and Whole Earth article keeps required metadata and image citations.
// ABOUTME: Protects NASA source attribution and core mission facts in the history note.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const articlePath = new URL('src/content/docs/history/artemis-ii-whole-earth.md', root);

test('Artemis II article has required frontmatter', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /^---\n[\s\S]*title:\s.+\n/);
	assert.match(content, /\ndescription:\s.+\n/);
	assert.match(content, /\ndate:\s\d{4}-\d{2}-\d{2}\n/);
	assert.match(content, /\nstatus:\s(?:seed|growing|evergreen)\n/);
	assert.match(content, /\ntags:\n(?:\s+- .+\n)+/);
});

test('Artemis II article cites NASA images and mission facts', async () => {
	const content = await readFile(articlePath, 'utf8');

	assert.match(content, /2026年4月1日/);
	assert.match(content, /2026年4月10日/);
	assert.match(content, /9日1時間32分/);
	assert.match(content, /694,481マイル/);
	assert.match(content, /252,756マイル/);
	assert.match(content, /画像引用: NASA/);
	assert.match(content, /https:\/\/www\.nasa\.gov\/image-detail\/artemis-ii-launch-15\//);
	assert.match(content, /https:\/\/www\.nasa\.gov\/image-article\/artemis-ii-splashes-down\//);
});
