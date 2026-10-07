<script setup lang="ts">
import { calculatorsByCategory } from '~/config/calculators'

useSeoMeta({
  title: 'All Business Calculators — Pricing, Marketing & Finance (₱)',
  description:
    'Browse all 10 Business Toolkit business calculators grouped by category: pricing (margin, markup, discount), marketing (ROAS, ROI, commission), and finance (break-even, cash flow, tax, invoice).',
  ogTitle: 'All Business Calculators — Business Toolkit',
  ogDescription: 'Pricing, marketing, and finance calculators, grouped by category.',
  ogUrl: 'https://business-toolkit.app/calculators',
  ogType: 'website',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://business-toolkit.app/calculators' }],
})

const categories = calculatorsByCategory()
const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Calculators' }]
</script>

<template>
  <div class="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8">
    <Breadcrumbs :items="breadcrumbItems" />

    <header class="flex flex-col gap-2">
      <h1 class="text-3xl font-bold text-neutral-100">Calculators</h1>
      <p class="text-neutral-400">
        Ten free, connected calculators for pricing, marketing, and finance decisions.
      </p>
    </header>

    <section v-for="group in categories" :key="group.category" :id="group.category" class="flex flex-col gap-4">
      <h2 class="text-xl font-semibold text-neutral-100">{{ group.label }}</h2>
      <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="calculator in group.items"
          :key="calculator.id"
          class="rounded-2xl border border-neutral-800 bg-neutral-900 p-4"
        >
          <NuxtLink :href="`/${calculator.slug}`" class="font-medium text-emerald-300 hover:underline">
            {{ calculator.name }}
          </NuxtLink>
          <p class="mt-1 text-sm text-neutral-500">{{ calculator.shortDescription }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>
