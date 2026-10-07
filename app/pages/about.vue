<script setup lang="ts">
useSeoMeta({
  title: 'About Business Toolkit — Business Finance Calculators',
  description:
    'Business Toolkit is a free, connected toolkit of business finance calculators built for small businesses, sellers, freelancers, and marketers in the Philippines.',
  ogUrl: 'https://business-toolkit.app/about',
})
useHead({ link: [{ rel: 'canonical', href: 'https://business-toolkit.app/about' }] })

const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'About' }]
</script>

<template>
  <div class="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8">
    <Breadcrumbs :items="breadcrumbItems" />
    <h1 class="text-3xl font-bold text-neutral-100">About Business Toolkit</h1>
    <p class="text-neutral-400">
      Business Toolkit is a free toolkit of connected business finance calculators built for small
      businesses, online sellers, freelancers, and marketers. Instead of ten unrelated tools, each
      calculator suggests a logical next step and carries your numbers forward, so you build up a
      full picture of your business — pricing, marketing, and finance — without retyping the same
      figures over and over.
    </p>
    <p class="text-neutral-400">
      Every calculation runs in your browser. We don't need an account to use the calculators, and
      your numbers are never sent to a server just to compute a result.
    </p>
    <h2 class="text-xl font-semibold text-neutral-100">Our approach</h2>
    <p class="text-neutral-400">
      Formulas are kept simple, transparent, and covered by automated tests. Every calculator page
      explains the formula in plain language and shows worked examples, so you can verify the math
      yourself rather than trust a black box.
    </p>
    <p class="text-neutral-400">
      Business Toolkit is supported by advertising, placed so it never interferes with the calculators
      themselves. See our <NuxtLink href="/privacy" class="text-emerald-400 hover:underline">Privacy Policy</NuxtLink>
      for details.
    </p>
  </div>
</template>
