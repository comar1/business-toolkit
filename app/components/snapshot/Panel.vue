<script setup lang="ts">
const historyStore = useHistoryStore()
const snapshotStore = useSnapshotStore()

historyStore.hydrate()
</script>

<template>
  <div class="snapshot-panel flex flex-col gap-6">
    <header>
      <h2 class="text-lg font-semibold text-neutral-100">Your Business Snapshot (this session)</h2>
      <p class="text-sm text-neutral-500">The latest figure from each calculator you've used.</p>
    </header>

    <p v-if="snapshotStore.isEmpty" class="text-sm text-neutral-500">
      Use any calculator below and your results will show up here.
    </p>

    <template v-else>
      <section v-for="group in snapshotStore.categories" :key="group.category">
        <h3 class="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-500">
          {{ group.label }}
        </h3>
        <dl class="grid gap-3 sm:grid-cols-2">
          <div
            v-for="figure in group.figures"
            :key="figure.calculatorId"
            class="rounded-xl border border-neutral-800 bg-neutral-900 p-3"
          >
            <dt class="text-xs text-neutral-500">{{ figure.label }} · {{ figure.calculatorName }}</dt>
            <dd class="font-mono text-lg font-semibold tabular-nums text-emerald-400">
              {{ formatValue(figure.value, figure.format) }}
            </dd>
            <NuxtLink :href="`/${figure.slug}`" class="text-xs text-emerald-400 hover:underline">
              Open calculator →
            </NuxtLink>
          </div>
        </dl>
      </section>

      <p class="text-sm text-neutral-500">
        {{ snapshotStore.stats.calculations }} calculations · {{ snapshotStore.stats.toolsUsed }} tools used
      </p>

      <p v-if="snapshotStore.notYetUsed.length" class="text-sm text-neutral-400">
        Not yet checked:
        <NuxtLink
          v-for="(calculator, index) in snapshotStore.notYetUsed.slice(0, 3)"
          :key="calculator.id"
          :href="`/${calculator.slug}`"
          class="font-medium text-emerald-400 hover:underline"
        >{{ calculator.name }}{{ index < Math.min(2, snapshotStore.notYetUsed.length - 1) ? ', ' : '' }}</NuxtLink>
        → Try it
      </p>
    </template>

    <CalculatorHistoryList />

    <SnapshotAccountPrompt />
  </div>
</template>
