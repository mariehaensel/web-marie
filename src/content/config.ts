import { defineCollection, z } from 'astro:content';

const agenda = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.coerce.date(),
    time: z.string().optional(),
    piece: z.string(),
    composer: z.string().optional(),
    colleagues: z.string().optional(),
    ensemble: z.string().optional(),
    venue: z.string(),
    ticketLink: z.string().optional(),
  }),
});

const vita = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
  }),
});

const kontakt = defineCollection({
  type: 'content',
  schema: z.object({
    phone: z.string().optional(),
    email: z.string(),
    instagram: z.string().optional(),
  }),
});

const media = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    image: z.string(),
    caption: z.string().optional(),
    videoUrl: z.string().optional(),
  }),
});

const home = defineCollection({
  type: 'content',
  schema: z.object({
    heroImage: z.string(),
    heroImageAlt: z.string().optional(),
  }),
});

export const collections = { agenda, vita, kontakt, media, home };
