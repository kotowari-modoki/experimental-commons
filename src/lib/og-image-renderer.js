// ABOUTME: Renders branded PNG share cards with Sharp and a bundled Japanese font.
// ABOUTME: Fits text to fixed regions and renders without network or browser access.
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';
import { IMAGE_WIDTH, IMAGE_HEIGHT } from './og-image.js';

const fontfile = resolve('src/assets/fonts/MPLUS1p-Medium.ttf');
const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' });
/** @type {Promise<Buffer> | undefined} */
let logo;

/** @param {string} text @param {number} limit */
function plainText(text, limit) {
	const characters = Array.from(segmenter.segment(text.replace(/\s+/g, ' ').trim()), ({ segment }) => segment);
	const limited = characters.length > limit ? `${characters.slice(0, limit - 1).join('')}…` : characters.join('');
	return limited.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '')
		.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

/**
 * @param {string} text
 * @param {{ size: number, width: number, height: number, color?: string, limit?: number }} options
 */
export async function renderText(text, { size, width, height, color = '#f8f1e5', limit = 120 }) {
	const options = {
		text: `<span foreground="${color}">${plainText(text, limit)}</span>`,
		font: `M PLUS 1p Medium ${size}`,
		fontfile,
		width,
		rgba: true,
		wrap: /** @type {const} */ ('word-char'),
		spacing: 8,
	};
	const rendered = await sharp({ text: options }).png().toBuffer({ resolveWithObject: true });
	if (rendered.info.height <= height) return rendered;
	return sharp({ text: { ...options, height } }).png().toBuffer({ resolveWithObject: true });
}

/** @param {import('./og-image.js').SocialImage} image */
export async function renderImage(image) {
	const accent = image.status === 'seed' ? '#f4b942' : image.status === 'evergreen' ? '#58b09c' : '#e98c72';
	const background = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
		<defs>
			<linearGradient id="night" x2="1" y2="1"><stop stop-color="#0d1c2c"/><stop offset="1" stop-color="#172e42"/></linearGradient>
			<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#f8f1e5" stroke-opacity=".035"/></pattern>
		</defs>
		<rect width="1200" height="630" fill="url(#night)"/>
		<rect width="1200" height="630" fill="url(#grid)"/>
		<g fill="none" stroke="${accent}" stroke-opacity=".13">
			<circle cx="1150" cy="105" r="110"/><circle cx="1150" cy="105" r="190"/>
			<circle cx="1150" cy="105" r="270"/>
			<path d="M870 105h280M1150 105v270"/>
		</g>
		<circle cx="960" cy="105" r="5" fill="${accent}"/>
		<circle cx="1150" cy="295" r="5" fill="#58b09c"/>
		<rect width="7" height="630" fill="${accent}"/>
		<rect x="64" y="167" width="26" height="3" rx="1.5" fill="${accent}"/>
		<path d="M64 548H1136" stroke="#f8f1e5" stroke-opacity=".16"/>
		<circle cx="72" cy="584" r="5" fill="${accent}"/>
	</svg>`);
	logo ??= readFile(resolve('public/favicon.svg')).then((svg) => sharp(svg).resize(62, 62).png().toBuffer());
	const [brand, tagline, section, title, description, status, date, icon] = await Promise.all([
		renderText('experimental-commons', { size: 27, width: 620, height: 36 }),
		renderText('まだ本になっていない知識の公共財', { size: 17, width: 680, height: 24, color: '#b7c5cb' }),
		renderText(image.section, { size: 19, width: 900, height: 28, color: accent }),
		renderText(image.title, { size: 64, width: 1064, height: 214 }),
		image.description ? renderText(image.description, { size: 22, width: 1056, height: 57, color: '#b7c5cb', limit: 82 }) : null,
		renderText(image.status ? `${image.status}  /  知識は育つ途中にある` : '問いから、知識を育てる。', { size: 18, width: 750, height: 28, color: '#b7c5cb' }),
		image.date ? renderText(image.date, { size: 18, width: 160, height: 28, color: '#b7c5cb' }) : null,
		logo,
	]);
	const overlays = [
		{ input: icon, left: 60, top: 49 },
		{ input: brand.data, left: 140, top: 56 },
		{ input: tagline.data, left: 141, top: 95 },
		{ input: section.data, left: 104, top: 157 },
		{ input: title.data, left: 64, top: 222 + Math.floor((214 - title.info.height) / 2) },
		{ input: status.data, left: 91, top: 572 },
	];
	if (description) overlays.push({ input: description.data, left: 66, top: 465 });
	if (date) overlays.push({ input: date.data, left: 1136 - date.info.width, top: 573 });
	return sharp(background)
		.resize(IMAGE_WIDTH, IMAGE_HEIGHT)
		.composite(overlays).removeAlpha().png().toBuffer();
}
