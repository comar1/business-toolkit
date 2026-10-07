<script setup lang="ts">
import { getCalculatorBySlug } from '~/config/calculators'

const route = useRoute()
const slug = route.params.calculator as string
const calculator = getCalculatorBySlug(slug)

if (!calculator) {
  throw createError({ statusCode: 404, statusMessage: 'Calculator not found', fatal: true })
}

const { data: page } = await useAsyncData(`calculator-content-${calculator.id}`, () =>
  queryCollection('calculators').where('calculatorId', '=', calculator.id).first(),
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Calculator content not found', fatal: true })
}

const canonical = `https://business-toolkit.app/${calculator.slug}`

useSeoMeta({
  title: page.value.metaTitle,
  description: page.value.metaDescription,
  ogTitle: page.value.metaTitle,
  ogDescription: page.value.metaDescription,
  ogUrl: canonical,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

useHead({
  link: [{ rel: 'canonical', href: canonical }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: calculator.name,
        url: canonical,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any (web-based)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'PHP' },
        description: page.value.metaDescription,
      }),
    },
    ...(page.value.faq.length
      ? [
          {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: page.value.faq.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: { '@type': 'Answer', text: item.answer },
              })),
            }),
          },
        ]
      : []),
  ],
})

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Calculators', href: '/calculators' },
  { label: calculator.categoryLabel, href: `/calculators#${calculator.category}` },
  { label: calculator.name },
]
</script>

<template>
  <div class="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-8">
    <Breadcrumbs :items="breadcrumbItems" />

    <header class="flex flex-col gap-2">
      <h1 class="text-2xl font-bold text-neutral-100 sm:text-3xl">{{ calculator.name }}</h1>
      <p class="text-neutral-400">{{ page.intro }}</p>
    </header>

    <section class="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6" aria-label="Calculator">
      <CalculatorWidget :calculator="calculator" />
    </section>

    <AdSlot position="below-result" :lazy="false" />

    <article class="content-body max-w-none">
      <ContentRenderer :value="page" />
    </article>

    <AdSlot position="in-content" />

    <section aria-labelledby="faq-heading" class="flex flex-col gap-4">
      <h2 id="faq-heading" class="text-xl font-semibold text-neutral-100">Frequently asked questions</h2>
      <details
        v-for="item in page.faq"
        :key="item.question"
        class="rounded-xl border border-neutral-800 p-4"
      >
        <summary class="cursor-pointer font-medium text-neutral-200">{{ item.question }}</summary>
        <p class="mt-2 text-neutral-400">{{ item.answer }}</p>
      </details>
    </section>

    <footer class="flex flex-col gap-2 border-t border-neutral-800 pt-4 text-xs text-neutral-600">
      <p>Last updated {{ page.updatedAt }}</p>
      <p>
        This calculator provides estimates for general planning only and is not financial, tax, or
        legal advice. Confirm important decisions with a qualified professional.
      </p>
    </footer>

    <SnapshotDrawer />
  </div>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.content-body :deep(h2) {
  @apply mt-6 text-xl font-semibold text-neutral-100;
}
.content-body :deep(h3) {
  @apply mt-4 text-lg font-semibold text-neutral-100;
}
.content-body :deep(p) {
  @apply mt-2 text-neutral-400;
}
.content-body :deep(ul) {
  @apply mt-2 list-disc pl-5 text-neutral-400;
}
.content-body :deep(pre) {
  @apply mt-2 overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900 p-3 text-sm text-neutral-200;
}
.content-body :deep(pre code) {
  @apply bg-transparent p-0;
}
.content-body :deep(code) {
  @apply rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-[0.9em] text-emerald-300;
}
.content-body :deep(strong) {
  @apply font-semibold text-neutral-100;
}
.content-body :deep(a) {
  @apply text-emerald-400 hover:underline;
}
</style>
