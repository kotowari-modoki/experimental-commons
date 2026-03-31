// ABOUTME: Confirms the Kojiki/Nihon Shoki history page exposes semantic flowchart markup.
// ABOUTME: Protects the page-level contract between the article source and rendered HTML.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('history timeline section is labeled as an image-like chronology', async () => {
	const page = await readFile(
		new URL('src/content/docs/history/kojiki-nihon-shoki-history.md', root),
		'utf8',
	);

	assert.match(page, /role="img"/);
	assert.match(page, /aria-label="古事記と日本書紀の成立史の時間軸"/);
	assert.match(page, /class="history-flowchart-node"/);
});
