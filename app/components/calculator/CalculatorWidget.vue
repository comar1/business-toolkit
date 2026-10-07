<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import type { CalculatorDefinition } from '~/config/calculators'

const props = defineProps<{ calculator: CalculatorDefinition }>()

const sharedValuesStore = useSharedValuesStore()
const historyStore = useHistoryStore()
const reopenStore = useReopenStore()

sharedValuesStore.hydrate()
historyStore.hydrate()

const values = reactive<Record<string, number | undefined>>({})
const prefilledKeys = reactive(new Set<string>())
const results = ref<Record<string, number> | null>(null)
let lastSavedKey = ''

function resetForCalculator() {
  for (const key of Object.keys(values)) delete values[key]
  prefilledKeys.clear()
  results.value = null
  lastSavedKey = ''

  // Directly reopening a history entry takes priority over shared-value prefill.
  const reopened = reopenStore.consume(props.calculator.id)
  const shared = props.calculator.fromShared(sharedValuesStore.values)

  for (const field of props.calculator.fields) {
    if (reopened && reopened[field.key] !== undefined) {
      values[field.key] = reopened[field.key]
    } else if (shared[field.key] !== undefined) {
      values[field.key] = shared[field.key]
      prefilledKeys.add(field.key)
    }
  }
}

watch(() => props.calculator.id, resetForCalculator, { immediate: true })

const runCalculation = useDebounceFn(() => {
  const filled = props.calculator.fields.every(
    (field) => values[field.key] !== undefined && !Number.isNaN(values[field.key]),
  )
  if (!filled) {
    results.value = null
    return
  }

  const inputs = Object.fromEntries(
    props.calculator.fields.map((field) => [field.key, values[field.key] as number]),
  )
  const computed = props.calculator.calculate(inputs)
  results.value = computed

  const dedupeKey = JSON.stringify(inputs)
  if (dedupeKey === lastSavedKey) return
  lastSavedKey = dedupeKey

  historyStore.addEntry(props.calculator.id, inputs, computed)
  sharedValuesStore.update(props.calculator.toShared(inputs, computed), props.calculator.name)
}, 500)

watch(values, runCalculation, { deep: true })

function updateField(key: string, value: number | undefined) {
  values[key] = value
  prefilledKeys.delete(key)
}

function sourceLabelFor(key: string): string | undefined {
  if (!prefilledKeys.has(key)) return undefined
  return sharedValuesStore.sources[key as keyof typeof sharedValuesStore.sources]
}
</script>

<template>
  <div class="calculator-widget flex flex-col gap-6">
    <form class="grid gap-4 sm:grid-cols-2" @submit.prevent>
      <CalculatorField
        v-for="field in calculator.fields"
        :key="field.key"
        :field="field"
        :model-value="values[field.key]"
        :prefilled-from="sourceLabelFor(field.key)"
        @update:model-value="(value) => updateField(field.key, value)"
      />
    </form>

    <CalculatorResultCard :result-fields="calculator.resultFields" :results="results" />

    <CalculatorNextSteps v-if="results" :next-steps="calculator.nextSteps" />
  </div>
</template>
