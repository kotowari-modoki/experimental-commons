// ABOUTME: Derives published documentation routes from src/content/docs files.
// ABOUTME: Shared tests use this so article additions do not require test-code changes.
import { readdirSync } from 'node:fs';
import { join, sep } from 'node:path';

export const defaultContentDir = 'src/content/docs';

export function contentFiles(contentDir = defaultContentDir) {
	const entries = readdirSync(contentDir, { recursive: true, encoding: 'utf8' });

	return entries
		.filter((entry) => /\.(md|mdx)$/.test(entry))
		.map((entry) => entry.split(sep).join('/'))
		.sort();
}

export function contentRoutes(contentDir = defaultContentDir) {
	return contentFiles(contentDir).map((file) =>
		file
			.replace(/\.(md|mdx)$/, '')
			.replace(/(^|\/)index$/, '')
			.replace(/\/$/, '')
			.toLowerCase(),
	);
}

export function contentPath(file, contentDir = defaultContentDir) {
	return join(contentDir, file);
}
