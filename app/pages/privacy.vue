<script setup lang="ts">
useSeoMeta({
  title: 'Privacy Policy — Business Toolkit',
  description: 'How Business Toolkit handles your data: what we store, what we don’t, and how advertising works on this site.',
  ogUrl: 'https://business-toolkit.app/privacy',
})
useHead({ link: [{ rel: 'canonical', href: 'https://business-toolkit.app/privacy' }] })

const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]
</script>

<template>
  <div class="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8">
    <Breadcrumbs :items="breadcrumbItems" />
    <h1 class="text-3xl font-bold text-neutral-100">Privacy Policy</h1>
    <p class="text-sm text-neutral-600">Last updated 2026-10-06</p>

    <h2 class="text-xl font-semibold text-neutral-100">What we store</h2>
    <p class="text-neutral-400">
      Calculator inputs and results are stored only in your browser's session storage, for the
      current browser tab. We do not send calculator inputs to a server, and this data is cleared
      automatically when you close the tab.
    </p>

    <h2 class="text-xl font-semibold text-neutral-100">Accounts</h2>
    <p class="text-neutral-400">
      Business Toolkit does not currently offer accounts. If accounts are introduced in the future, this
      policy will be updated before that feature launches, and you will be able to choose whether
      to create one.
    </p>

    <h2 class="text-xl font-semibold text-neutral-100">Advertising and analytics</h2>
    <p class="text-neutral-400">
      Business Toolkit reserves space for advertising to keep the calculators free, but no ad network is
      connected yet. This page will be updated to name the specific ad network and any analytics
      tools before either is enabled, along with how to opt out where applicable.
    </p>

    <h2 class="text-xl font-semibold text-neutral-100">Contact</h2>
    <p class="text-neutral-400">
      Questions about this policy can be sent to
      <a href="mailto:hello@business-toolkit.app" class="text-emerald-400 hover:underline">hello@business-toolkit.app</a>.
    </p>
  </div>
</template>
