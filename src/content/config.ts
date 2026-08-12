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
    ticketLabel: z.string().optional(),
  }),
});

const vita = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    excerpt: z.string().optional(),
    photo: z.string(),
  }),
});

const kontakt = defineCollection({
  type: 'content',
  schema: z.object({
    email: z.string(),
    instagram: z.string().optional(),
    backgroundImage: z.string(),
  }),
});

const media = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    image: z.string(),
    caption: z.string().optional(),
    videoUrl: z.string().optional(),
    category: z.enum(['buehne', 'portrait', 'video']).optional(),
    credit: z.string().optional(),
  }),
});

const home = defineCollection({
  type: 'content',
  schema: z.object({
    heroImage: z.string(),
    heroImageAlt: z.string().optional(),
  }),
});

const impressum = defineCollection({ type: 'content', schema: z.object({}) });
const datenschutz = defineCollection({ type: 'content', schema: z.object({}) });

export const collections = { agenda, vita, kontakt, media, home, impressum, datenschutz };
