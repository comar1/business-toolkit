import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    calculators: defineCollection({
      type: 'page',
      source: 'calculators/*.md',
      schema: z.object({
        calculatorId: z.string(),
        metaTitle: z.string(),
        metaDescription: z.string(),
        intro: z.string(),
        updatedAt: z.string(),
        faq: z.array(
          z.object({
            question: z.string(),
            answer: z.string(),
          }),
        ),
      }),
    }),
  },
})
