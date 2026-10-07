<script setup lang="ts">
import { getCalculatorById } from '~/config/calculators'
import type { NextStepLink } from '~/utils/calc/types'

defineProps<{
  nextSteps: NextStepLink[]
}>()
</script>

<template>
  <nav v-if="nextSteps.length" aria-label="Suggested next steps" class="next-steps">
    <ul class="flex flex-col gap-2">
      <li v-for="step in nextSteps" :key="step.id">
        <NuxtLink
          v-if="getCalculatorById(step.id)"
          :href="`/${getCalculatorById(step.id)!.slug}`"
          class="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-300 hover:bg-emerald-500/20"
        >
          <span aria-hidden="true">→</span>
          {{ step.question }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
