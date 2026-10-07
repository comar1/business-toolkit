<script setup lang="ts">
useSeoMeta({
  title: 'Terms of Use — Business Toolkit',
  description: 'Terms of use for the Business Toolkit business finance calculators.',
  ogUrl: 'https://business-toolkit.app/terms',
})
useHead({ link: [{ rel: 'canonical', href: 'https://business-toolkit.app/terms' }] })

const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Terms of Use' }]
</script>

<template>
  <div class="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8">
    <Breadcrumbs :items="breadcrumbItems" />
    <h1 class="text-3xl font-bold text-neutral-100">Terms of Use</h1>
    <p class="text-sm text-neutral-600">Last updated 2026-10-06</p>

    <h2 class="text-xl font-semibold text-neutral-100">Estimates, not advice</h2>
    <p class="text-neutral-400">
      Every calculator on Business Toolkit produces an estimate based on the numbers you enter and the
      formula described on that page. Results are for general planning only and are not financial,
      tax, accounting, or legal advice. Confirm important decisions with a qualified professional.
    </p>

    <h2 class="text-xl font-semibold text-neutral-100">No warranty</h2>
    <p class="text-neutral-400">
      Business Toolkit is provided "as is" without warranties of any kind. We work to keep formulas
      accurate and covered by automated tests, but we can't guarantee the site is error-free or
      uninterrupted.
    </p>

    <h2 class="text-xl font-semibold text-neutral-100">Acceptable use</h2>
    <p class="text-neutral-400">
      Don't attempt to disrupt the site, scrape it at scale, or use it in a way that violates
      applicable law.
    </p>

    <h2 class="text-xl font-semibold text-neutral-100">Changes</h2>
    <p class="text-neutral-400">
      We may update these terms as the product changes. Continued use after an update means you
      accept the revised terms.
    </p>
  </div>
</template>
