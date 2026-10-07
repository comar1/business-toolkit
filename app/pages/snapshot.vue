<script setup lang="ts">
// Private, client-only view — no useful static content, so it's noindex and
// excluded from the sitemap/robots (see nuxt.config.ts routeRules).
useSeoMeta({
  title: 'Your Business Snapshot',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-8">
    <ClientOnly>
      <SnapshotPanel />
      <template #fallback>
        <p class="text-sm text-neutral-500">Loading your snapshot…</p>
      </template>
    </ClientOnly>
  </div>
</template>
