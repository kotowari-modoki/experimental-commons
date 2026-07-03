// ABOUTME: Confirms the latest built site contains one HTML page for each docs route.
// ABOUTME: Gives broad end-to-end coverage without binding tests to individual article prose.
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

import { contentRoutes } from './helpers/content-routes.mjs';

function outputPathFor(route) {
	if (route === '404') return 'dist/404.html';
	return route === '' ? 'dist/index.html' : `dist/${route}/index.html`;
}

test('built output contains a page with an h1 for every content route', () => {
	for (const route of contentRoutes()) {
		const outputPath = outputPathFor(route);

		assert.ok(existsSync(outputPath), `${outputPath} missing; run pnpm build before e2e checks`);
		const html = readFileSync(outputPath, 'utf8');
		assert.match(html, /<h1\b/i, `${outputPath} missing h1`);
	}
});
