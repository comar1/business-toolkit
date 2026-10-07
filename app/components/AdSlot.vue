<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

/**
 * Reserves space for an ad before any ad network is connected, so turning
 * ads on later never shifts layout (README: Advertising Requirements).
 */
const props = withDefaults(
  defineProps<{
    position: 'below-result' | 'in-content' | 'sidebar'
    lazy?: boolean
  }>(),
  { lazy: true },
)

// No ad network is wired up yet — flip this on when one is connected.
const AD_NETWORK_READY = false

const heights: Record<typeof props.position, string> = {
  'below-result': 'min-h-[100px]',
  'in-content': 'min-h-[250px]',
  sidebar: 'min-h-[600px]',
}

const target = useTemplateRef<HTMLElement>('target')
const isVisible = ref(!props.lazy)
const isDev = import.meta.dev

if (import.meta.client && props.lazy) {
  useIntersectionObserver(
    target,
    ([entry]) => {
      if (entry?.isIntersecting) isVisible.value = true
    },
    { rootMargin: '200px' },
  )
}
</script>

<template>
  <div v-if="AD_NETWORK_READY && isVisible" ref="target" class="ad-slot" :class="heights[position]">
    <span class="ad-slot__label">Advertisement</span>
    <!-- Ad network markup renders here once connected. -->
  </div>
  <div
    v-else-if="isDev"
    ref="target"
    class="ad-slot ad-slot--placeholder"
    :class="heights[position]"
  >
    <span class="ad-slot__label">Advertisement ({{ position }})</span>
  </div>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.ad-slot {
  @apply flex w-full items-center justify-center rounded-xl border border-dashed border-neutral-800 bg-neutral-900 text-xs text-neutral-600;
}
.ad-slot--placeholder {
  @apply border-amber-500/40 bg-amber-500/10 text-amber-400;
}
.ad-slot__label {
  @apply uppercase tracking-wide;
}
</style>
