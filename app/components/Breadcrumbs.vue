<script setup lang="ts">
export interface BreadcrumbItem {
  label: string
  href?: string
}

const props = defineProps<{ items: BreadcrumbItem[] }>()

const jsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: props.items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    ...(item.href ? { item: `https://business-toolkit.app${item.href}` } : {}),
  })),
}))

useHead({
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd.value) }],
})
</script>

<template>
  <nav aria-label="Breadcrumb" class="text-sm text-neutral-500">
    <ol class="flex flex-wrap items-center gap-1">
      <li v-for="(item, index) in items" :key="item.label" class="flex items-center gap-1">
        <NuxtLink v-if="item.href" :href="item.href" class="hover:text-emerald-400 hover:underline">
          {{ item.label }}
        </NuxtLink>
        <span v-else aria-current="page">{{ item.label }}</span>
        <span v-if="index < items.length - 1" aria-hidden="true">›</span>
      </li>
    </ol>
  </nav>
</template>
