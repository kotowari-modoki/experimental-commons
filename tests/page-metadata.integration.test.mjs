// ABOUTME: Verifies the site wiring uses the custom Starlight PageTitle override.
// ABOUTME: Protects the Astro config and component contract that surfaces article status.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('astro config registers the PageTitle override', async () => {
	const astroConfig = await readFile(new URL('astro.config.mjs', root), 'utf8');

	assert.match(
		astroConfig,
		/components:\s*\{[\s\S]*PageTitle:\s*['"]\.\/src\/components\/PageTitle\.astro['"]/,
	);
});

test('the override reads the current page entry metadata', async () => {
	const component = await readFile(new URL('src/components/PageTitle.astro', root), 'utf8');

	assert.match(component, /Astro\.locals\.starlightRoute\.entry\.data/);
	assert.match(component, /getPageMetadata/);
});
