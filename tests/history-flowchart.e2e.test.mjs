// ABOUTME: Checks the reader-facing chronology includes visible directional cues between milestones.
// ABOUTME: Acts as a lightweight end-to-end contract for the fallback flowchart presentation.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('history timeline includes arrow separators and milestone detail text', async () => {
	const page = await readFile(
		new URL('src/content/docs/history/kojiki-nihon-shoki-history.md', root),
		'utf8',
	);

	assert.match(page, /class="history-flowchart-arrow"/);
	assert.match(page, /aria-hidden="true"[\s\S]*?>↓<\/div>/);
	assert.match(page, /太安万侶が筆録編集/);
	assert.match(page, /舎人親王らが編纂/);
});
