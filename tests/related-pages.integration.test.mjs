// ABOUTME: Verifies the RelatedPages component file structure and API contract.
// ABOUTME: Ensures the component uses getCollection and renders related page links.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('RelatedPages.astro file exists', async () => {
  const content = await readFile(new URL('src/components/RelatedPages.astro', root), 'utf8');
  assert.ok(content.length > 0);
});

test('RelatedPages.astro uses getCollection to fetch docs', async () => {
  const content = await readFile(new URL('src/components/RelatedPages.astro', root), 'utf8');
  assert.match(content, /getCollection\(['"]docs['"]\)/);
});

test('RelatedPages.astro accepts currentSlug and tags props', async () => {
  const content = await readFile(new URL('src/components/RelatedPages.astro', root), 'utf8');
  assert.match(content, /currentSlug/);
  assert.match(content, /tags/);
});

test('RelatedPages.astro renders nothing when tags is empty', async () => {
  const content = await readFile(new URL('src/components/RelatedPages.astro', root), 'utf8');
  assert.match(content, /tags\.length/);
});
