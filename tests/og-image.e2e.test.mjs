// ABOUTME: Checks every built page's social-image URL against the generated PNG assets.
// ABOUTME: Covers documentation, tag pages, base-path handling, and duplicate metadata.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import sharp from 'sharp';

function metaValues(html, key) {
	return Array.from(html.matchAll(/<meta\b[^>]*>/g), ([tag]) => {
		const attrs = Object.fromEntries(Array.from(tag.matchAll(/([\w:-]+)="([^"]*)"/g), ([, name, value]) => [name, value]));
		return (attrs.property ?? attrs.name) === key ? attrs.content : undefined;
	}).filter((value) => value !== undefined);
}

test('every built page shares a real PNG with a unique Open Graph and Twitter image', async () => {
	const files = (await readdir('dist', { recursive: true })).filter((file) => file.endsWith('.html'));
	assert.ok(files.includes('index.html'), 'run pnpm build before e2e checks');
	assert.ok(files.some((file) => file.startsWith('tags/')), 'tag pages must also be checked');
	const checked = new Set();
	for (const file of files) {
		const html = await readFile(`dist/${file}`, 'utf8');
		const images = metaValues(html, 'og:image');
		assert.equal(images.length, 1, `${file}: exactly one og:image`);
		const url = new URL(images[0]);
		assert.equal(url.origin, 'https://kotowari-modoki.github.io', file);
		assert.match(url.pathname, /^\/experimental-commons\/og\/[a-f0-9]+\.png$/, file);
		assert.deepEqual(metaValues(html, 'twitter:image'), images, file);
		assert.deepEqual(metaValues(html, 'twitter:card'), ['summary_large_image'], file);
		assert.deepEqual(metaValues(html, 'og:image:type'), ['image/png'], file);
		assert.deepEqual(metaValues(html, 'og:image:width'), ['1200'], file);
		assert.deepEqual(metaValues(html, 'og:image:height'), ['630'], file);
		assert.ok(metaValues(html, 'og:image:alt')[0]?.length > 0, `${file}: image alt`);
		if (!checked.has(url.pathname)) {
			const path = `dist${url.pathname.replace('/experimental-commons', '')}`;
			const metadata = await sharp(path).metadata();
			assert.equal(metadata.format, 'png', path);
			assert.equal(metadata.width, 1200, path);
			assert.equal(metadata.height, 630, path);
			checked.add(url.pathname);
		}
	}
});
