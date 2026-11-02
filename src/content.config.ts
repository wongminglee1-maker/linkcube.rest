import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string().optional(),
    pubDate: z.string(),
    updatedDate: z.string().optional(),
    author: z.string().default("LinkCube 数据质量审核组"),
    category: z.string().default("技术分析与指南"),
    tags: z.array(z.string()),
    coreKeywords: z.array(z.string()),
    readTimeMinutes: z.number().default(6),
    characterCount: z.number().optional(),
    evidenceStatus: z.enum(['REFERENCE_ONLY', 'LISTED', 'MEASURED', 'VERIFIED', 'UNAVAILABLE']).default('REFERENCE_ONLY'),
  })
});

export const collections = { articles };
