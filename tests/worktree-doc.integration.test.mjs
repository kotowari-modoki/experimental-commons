// ABOUTME: Verifies the docs sidebar exposes the worktree operations guide to readers.
// ABOUTME: Ensures Astro navigation wiring stays aligned with the new article slug.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('astro config links the worktree guide from the Tools sidebar', async () => {
	const astroConfig = await readFile(new URL('astro.config.mjs', root), 'utf8');

	assert.match(astroConfig, /label:\s*["']Git worktree と Codex 運用["']/);
	assert.match(astroConfig, /link:\s*["']\/ai\/agents\/git-worktree-with-codex\/["']/);
});
