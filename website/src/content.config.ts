// import { defineCollection } from 'astro:content';
// import { docsLoader } from '@astrojs/starlight/loaders';
// import { docsSchema } from '@astrojs/starlight/schema';

// export const collections = {
// 	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
// };

// website/src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  loader: glob({
    base: '../',
    pattern: '{skills,subagents}/**/*.md',
  }),
  schema: z.object({
    title: z.string().optional(),
  }),
});

export const collections = { docs };