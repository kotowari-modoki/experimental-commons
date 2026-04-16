// ABOUTME: Verifies top-page Starlight icon names resolve to bundled icon definitions.
// ABOUTME: Prevents homepage cards and action buttons from silently losing their icons.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

function extractIconNames(content) {
	const frontmatterIcons = [...content.matchAll(/^\s*icon:\s*['"]?([^'"\s]+)['"]?\s*$/gm)].map(
		(match) => match[1]
	);
	const cardIcons = [...content.matchAll(/\bicon=(['"])([^'"]+)\1/g)].map((match) => match[2]);

	return [...new Set([...frontmatterIcons, ...cardIcons])];
}

function extractBuiltInIcons(content) {
	const icons = [];

	for (const line of content.split('\n')) {
		const match = line.match(/^\s*(?:'([^']+)'|([A-Za-z][A-Za-z0-9]*))\s*:/);
		if (match) icons.push(match[1] || match[2]);
	}

	return new Set(icons);
}

test('top page only uses Starlight icons that exist', async () => {
	const [topPage, starlightIcons] = await Promise.all([
		readFile(new URL('src/content/docs/index.mdx', root), 'utf8'),
		readFile(new URL('node_modules/@astrojs/starlight/components-internals/Icons.ts', root), 'utf8'),
	]);

	const usedIcons = extractIconNames(topPage);
	const builtInIcons = extractBuiltInIcons(starlightIcons);
	const missingIcons = usedIcons.filter((icon) => !builtInIcons.has(icon));

	assert.deepEqual(missingIcons, []);
});
