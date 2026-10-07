<script setup lang="ts">
import type { ResultField } from '~/utils/calc/types'

defineProps<{
  resultFields: ResultField[]
  results: Record<string, number> | null
}>()
</script>

<template>
  <div
    class="result-card rounded-xl border border-neutral-800 bg-neutral-950/50 p-4"
    aria-live="polite"
  >
    <p v-if="!results" class="text-sm text-neutral-500">
      Fill in the fields above to see your result.
    </p>
    <dl v-else class="grid gap-3 sm:grid-cols-2">
      <div
        v-for="field in resultFields"
        :key="field.key"
        :class="field.primary ? 'sm:col-span-2' : ''"
      >
        <dt class="text-xs font-medium uppercase tracking-wide text-neutral-500">
          {{ field.label }}
        </dt>
        <dd
          class="font-mono font-semibold tabular-nums"
          :class="field.primary ? 'text-3xl text-emerald-400' : 'text-xl text-neutral-100'"
        >
          {{ formatValue(results[field.key], field.format) }}
        </dd>
      </div>
    </dl>
  </div>
</template>
