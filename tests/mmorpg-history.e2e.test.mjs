// ABOUTME: Checks the MMORPG history article keeps reader-facing structure for source-aware publication.
// ABOUTME: Acts as a lightweight end-to-end contract for the generated research note.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('MMORPG history page includes reader-facing research sections', async () => {
	const page = await readFile(
		new URL('src/content/docs/history/mmorpg-history-from-mud.md', root),
		'utf8',
	);

	assert.match(page, /^## まず結論/m);
	assert.match(page, /^## 年表/m);
	assert.match(page, /^## まだ曖昧な点/m);
	assert.match(page, /^## 一次情報源と参照/m);
});
