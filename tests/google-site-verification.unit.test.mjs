// ABOUTME: Verifies the shared document head exposes Google Search Console ownership proof.
// ABOUTME: Keeps the verification token present so Google can validate the published site.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('shared head includes the Google site verification token', async () => {
	const component = await readFile(new URL('src/components/Head.astro', root), 'utf8');

	assert.match(component, /name="google-site-verification"/);
	assert.match(component, /ysuEj023oFjddObiBNrkXRESp6QvqewPEAm0d0Ak61c/);
});
