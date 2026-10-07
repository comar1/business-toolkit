<script setup lang="ts">
import { calculatorsByCategory } from '~/config/calculators'

useSeoMeta({
  title: 'Business Toolkit — Free Business Finance Calculators (₱)',
  description:
    'Free, connected business finance calculators for small businesses, sellers, freelancers, and marketers. Profit margin, markup, ROAS, break-even, tax, and more — all in ₱.',
  ogTitle: 'Business Toolkit — Free Business Finance Calculators',
  ogDescription:
    'Profit margin, markup, ROAS, break-even, tax, and more — connected calculators that carry your numbers forward.',
  ogUrl: 'https://business-toolkit.app/',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://business-toolkit.app/' }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Business Toolkit',
        url: 'https://business-toolkit.app/',
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Business Toolkit',
        url: 'https://business-toolkit.app/',
      }),
    },
  ],
})

const categories = calculatorsByCategory()
</script>

<template>
  <div class="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-12">
    <section class="flex flex-col items-start gap-4">
      <h1 class="text-3xl font-bold text-neutral-100 sm:text-4xl">
        One connected toolkit for your business finances
      </h1>
      <p class="max-w-2xl text-lg text-neutral-400">
        Profit margin, markup, ROAS, break-even, tax, and more — ten free calculators that carry
        your numbers forward, so you never retype the same figures twice. Everything runs in your
        browser in ₱, no account needed.
      </p>
      <NuxtLink
        href="/calculators"
        class="rounded-xl bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-500"
      >
        Browse all calculators
      </NuxtLink>
    </section>

    <section v-for="group in categories" :key="group.category" class="flex flex-col gap-4">
      <h2 class="text-xl font-semibold text-neutral-100">{{ group.label }}</h2>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="calculator in group.items"
          :key="calculator.id"
          :href="`/${calculator.slug}`"
          class="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 transition hover:border-neutral-700 hover:bg-neutral-800/50"
        >
          <h3 class="font-medium text-neutral-100">{{ calculator.name }}</h3>
          <p class="mt-1 text-sm text-neutral-500">{{ calculator.shortDescription }}</p>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
