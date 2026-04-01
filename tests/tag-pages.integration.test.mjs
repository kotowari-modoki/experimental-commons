// ABOUTME: Verifies the tag index page file exists and uses correct Astro patterns.
// ABOUTME: Ensures static path generation and collection filtering are wired correctly.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('tag page file exists', async () => {
  const content = await readFile(new URL('src/pages/tags/[tag].astro', root), 'utf8');
  assert.ok(content.length > 0);
});

test('tag page uses getStaticPaths', async () => {
  const content = await readFile(new URL('src/pages/tags/[tag].astro', root), 'utf8');
  assert.match(content, /getStaticPaths/);
});

test('tag page uses getCollection for docs', async () => {
  const content = await readFile(new URL('src/pages/tags/[tag].astro', root), 'utf8');
  assert.match(content, /getCollection\(['"]docs['"]\)/);
});

test('tag page renders entry links', async () => {
  const content = await readFile(new URL('src/pages/tags/[tag].astro', root), 'utf8');
  assert.match(content, /entry\.id/);
  assert.match(content, /entry\.data\.title/);
});
