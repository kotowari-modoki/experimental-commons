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
				author: z.enum(['ai', 'human']).optional(),
				provenance: z
					.object({
						captured_at: z.coerce.date().optional(),
						source_type: z
							.enum([
								'personal_experience',
								'official_source',
								'book',
								'paper',
								'web_research',
								'ai_session',
								'manual_note',
								'curriculum_guideline',
								'other',
							])
							.optional(),
						source_ref: z.union([z.string(), z.array(z.string())]).optional(),
						ai_process: z
							.array(
								z.enum([
									'summarize',
									'translate',
									'classify',
									'extract',
									'compare',
									'synthesize',
									'critique',
									'rewrite',
									'fact_check',
									'structure',
								]),
							)
							.optional(),
						confidence: z.enum(['low', 'medium', 'high']).optional(),
						related_notes: z.array(z.string()).optional(),
						review_needed: z.boolean().optional(),
					})
					.optional(),
				knowledge_status: z
					.object({
						claim_status: z
							.enum(['active', 'tentative', 'superseded', 'archived'])
							.optional(),
						supersedes: z.array(z.string()).optional(),
						superseded_by: z.array(z.string()).optional(),
						related_notes: z.array(z.string()).optional(),
						contradiction_review: z
							.enum(['none', 'required', 'reviewed'])
							.optional(),
					})
					.optional(),
			}),
		}),
	}),
};
