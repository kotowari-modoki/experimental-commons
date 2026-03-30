// ABOUTME: Formats page frontmatter metadata for the article header in Starlight.
// ABOUTME: Keeps status and date rendering logic small, predictable, and testable.
/**
 * @param {Date | undefined} value
 * @returns {string | null}
 */
export function formatPageDate(value) {
	if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
		return null;
	}

	const year = value.getUTCFullYear();
	const month = String(value.getUTCMonth() + 1).padStart(2, '0');
	const day = String(value.getUTCDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}

/**
 * @param {{ status?: string; date?: Date }} data
 * @returns {Array<{ label: string; value: string }>}
 */
export function getPageMetadata(data) {
	const metadata = [];

	if (data.status) {
		metadata.push({ label: 'status', value: data.status });
	}

	const formattedDate = formatPageDate(data.date);

	if (formattedDate) {
		metadata.push({ label: 'date', value: formattedDate });
	}

	return metadata;
}
