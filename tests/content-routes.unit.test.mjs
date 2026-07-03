// ABOUTME: Verifies docs file paths convert into Starlight-style public routes.
// ABOUTME: Keeps route enumeration generic so individual articles do not need tests.
import test from 'node:test';
import assert from 'node:assert/strict';

import { contentFiles, contentRoutes } from './helpers/content-routes.mjs';

test('contentRoutes collects markdown and mdx files as extension-less routes', () => {
	const routes = contentRoutes();

	assert.ok(routes.includes('ai/agents/git-worktree-with-codex'));
	assert.ok(routes.includes('books/three-major-waka-anthologies'));
	assert.ok(routes.includes('guides/contributing'));
});

test('contentRoutes maps index files to their directory route', () => {
	const routes = contentRoutes();

	assert.ok(routes.includes(''));
});

test('contentFiles excludes non-content test files', () => {
	const files = contentFiles();

	assert.equal(files.every((file) => !file.includes('.test.')), true);
});

test('contentRoutes returns lowercase routes only', () => {
	const routes = contentRoutes();

	assert.equal(routes.every((route) => route === route.toLowerCase()), true);
});
