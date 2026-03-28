// ABOUTME: Defines the docs collection schema used by the published knowledge garden.
// ABOUTME: Extends Starlight frontmatter so content metadata matches this repository's rules.
import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				date: z.coerce.date(),
				status: z.enum(['seed', 'growing', 'evergreen']),
				tags: z.array(z.string()).default([]),
			}),
		}),
	}),
};
