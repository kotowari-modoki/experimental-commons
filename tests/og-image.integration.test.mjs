// ABOUTME: Exercises actual PNG rendering with bundled Japanese typography.
// ABOUTME: Checks output dimensions, escaped text, and bounded long-title layout.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';
import { renderImage, renderText } from '../src/lib/og-image-renderer.js';

test('Japanese and markup-like titles produce distinct, opaque 1200 x 630 PNGs', async () => {
	const card = {
		title: '知識の公共財 & <実験> "進行中"',
		description: '未完成の問いを、その未完成さごと公開する。',
		section: 'KNOWLEDGE IN PROGRESS',
		status: 'growing',
		date: '2026-10-08',
	};
	const first = await renderImage(card);
	const second = await renderImage({ ...card, title: '異なる日本語のタイトル' });
	assert.notDeepEqual(first, second);
	const meta = await sharp(first).metadata();
	assert.equal(meta.format, 'png');
	assert.equal(meta.width, 1200);
	assert.equal(meta.height, 630);
	assert.equal(meta.hasAlpha, false);
});

test('long Japanese titles and unbroken words fit the reserved text area', async () => {
	for (const text of ['日本語の長いタイトル'.repeat(12), 'ExperimentalCommons'.repeat(10)]) {
		const rendered = await renderText(text, { size: 64, width: 1064, height: 214 });
		assert.ok(rendered.info.width <= 1064);
		assert.ok(rendered.info.height <= 214);
	}
});

test('Japanese rendering stays identical without any system font directories', async () => {
	const options = { size: 48, width: 1000, height: 160 };
	const text = '観測・仮説・検証 ― 未完成の知識を育てる';
	const rendered = await renderText(text, options);
	const expected = createHash('sha256').update(rendered.data).digest('hex');
	const dir = await mkdtemp(join(tmpdir(), 'og-fonts-'));
	try {
		const config = join(dir, 'fonts.conf');
		await writeFile(config, `<fontconfig><cachedir>${dir}</cachedir></fontconfig>`);
		const script = `
			import { createHash } from 'node:crypto';
			import { renderText } from './src/lib/og-image-renderer.js';
			const { data } = await renderText(${JSON.stringify(text)}, ${JSON.stringify(options)});
			console.log(createHash('sha256').update(data).digest('hex'));
		`;
		const child = spawnSync(process.execPath, ['--input-type=module', '-e', script], {
			encoding: 'utf8',
			env: { ...process.env, FONTCONFIG_FILE: config },
		});
		assert.equal(child.status, 0, child.stderr || child.error?.message);
		assert.equal(child.stdout.trim(), expected);
	} finally {
		await rm(dir, { recursive: true, force: true });
	}
});
