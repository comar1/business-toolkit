<script setup lang="ts">
import type { CalculatorField } from '~/utils/calc/types'

const props = defineProps<{
  field: CalculatorField
  modelValue: number | undefined
  prefilledFrom?: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: number | undefined] }>()

const inputId = `field-${props.field.key}`

function onInput(event: Event) {
  const raw = (event.target as HTMLInputElement).value
  emit('update:modelValue', raw === '' ? undefined : Number(raw))
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <label :for="inputId" class="text-sm font-medium text-neutral-300">{{ field.label }}</label>
    <div class="relative">
      <span
        v-if="field.format === 'currency'"
        class="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-600"
        aria-hidden="true"
      >₱</span>
      <input
        :id="inputId"
        type="number"
        inputmode="decimal"
        step="any"
        :min="field.min"
        :placeholder="field.placeholder !== undefined ? String(field.placeholder) : undefined"
        :value="modelValue ?? ''"
        class="w-full rounded-xl border border-neutral-800 bg-neutral-900 py-2 pr-9 font-mono text-base tabular-nums text-neutral-100 placeholder:text-neutral-600 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
        :class="field.format === 'currency' ? 'pl-7' : 'pl-3'"
        @input="onInput"
      >
      <span
        v-if="field.format === 'percent'"
        class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-600"
        aria-hidden="true"
      >%</span>
    </div>
    <p v-if="prefilledFrom" class="text-xs text-emerald-400">
      From your {{ prefilledFrom }} calculation · editable
    </p>
  </div>
</template>
