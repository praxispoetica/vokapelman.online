import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const worksCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/works' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      type: z.enum(['novel', 'flash-fiction', 'short-stories', 'poetry']),
      status: z.enum(['available', 'forthcoming']).default('available'),
      publishDate: z.date().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      blurb: z.string(),
      tagline: z.string().optional(),
      featured: z.boolean().default(false),
      /** Buy links per format. Use your Payhip/Gumroad product URLs. Omit a format to hide it. */
      formats: z
        .array(
          z.object({
            format: z.enum(['ebook', 'paperback', 'audiobook']),
            label: z.string().optional(),
            price: z.string().optional(),
            buyUrl: z.string().optional(),
          })
        )
        .default([]),
      praise: z.array(z.object({ quote: z.string(), source: z.string() })).default([]),
      metadata: metadataDefinition(),
    }),
});

const postCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/post' }),
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    /** Alternative text for the cover image. Leave empty for decorative stock photos. */
    imageAlt: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),

    metadata: metadataDefinition(),
  }),
});

export const collections = {
  works: worksCollection,
  post: postCollection,
};
