// ABOUTME: Generates a static PNG share card for every document and tag page.
// ABOUTME: Runs inside Astro's existing build so GitHub Pages needs no image service.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { getCollectionImages, getImageId, type SocialImage } from '../../lib/og-image.js';
import { renderImage } from '../../lib/og-image-renderer.js';

export const getStaticPaths: GetStaticPaths = async () => {
	const docs = await getCollection('docs');
	const images = getCollectionImages(docs, import.meta.env.MODE !== 'production');
	const unique = new Map(images.map((image) => [getImageId(image), image]));
	return Array.from(unique, ([id, image]) => ({ params: { id }, props: { image } }));
};

export const GET: APIRoute = async ({ props }) => {
	const png = await renderImage(props.image as SocialImage);
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
