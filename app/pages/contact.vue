<script setup lang="ts">
useSeoMeta({
  title: 'Contact Business Toolkit',
  description: 'Get in touch with the Business Toolkit team with questions, feedback, or corrections.',
  ogUrl: 'https://business-toolkit.app/contact',
})
useHead({ link: [{ rel: 'canonical', href: 'https://business-toolkit.app/contact' }] })

const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Contact' }]
</script>

<template>
  <div class="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8">
    <Breadcrumbs :items="breadcrumbItems" />
    <h1 class="text-3xl font-bold text-neutral-100">Contact</h1>
    <p class="text-neutral-400">
      Spotted an error in a formula, have a feature request, or want to report an issue with an ad?
      Reach out at
      <a href="mailto:hello@business-toolkit.app" class="text-emerald-400 hover:underline">hello@business-toolkit.app</a>.
    </p>
    <p class="text-neutral-400">We read every message and aim to reply within a few business days.</p>
  </div>
</template>
