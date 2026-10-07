<script setup lang="ts">
import { getCalculatorById } from '~/config/calculators'

const historyStore = useHistoryStore()
const reopenStore = useReopenStore()

historyStore.hydrate()

function reopen(entryId: string) {
  const entry = historyStore.entries.find((item) => item.id === entryId)
  if (!entry) return
  reopenStore.queue(entry)
  const calculator = getCalculatorById(entry.calculator)
  if (calculator) navigateTo(`/${calculator.slug}`)
}

function formatTime(iso: string) {
  const date = new Date(iso)
  return date.toLocaleTimeString('en-PH', { hour: 'numeric', minute: '2-digit' })
}
</script>

<template>
  <section v-if="historyStore.entries.length" class="history-list" aria-label="Recent calculations">
    <div class="mb-3 flex items-center justify-between">
      <h2 class="text-sm font-semibold text-neutral-300">Recent calculations</h2>
      <button
        type="button"
        class="text-xs font-medium text-neutral-500 underline-offset-2 hover:underline"
        @click="historyStore.clearAll()"
      >
        Clear all
      </button>
    </div>
    <ul class="flex flex-col gap-2">
      <li
        v-for="entry in historyStore.entries"
        :key="entry.id"
        class="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm"
      >
        <button type="button" class="flex-1 text-left" @click="reopen(entry.id)">
          <span class="font-medium text-neutral-200">
            {{ getCalculatorById(entry.calculator)?.name ?? entry.calculator }}
          </span>
          <span class="ml-2 text-xs text-neutral-600">{{ formatTime(entry.createdAt) }}</span>
        </button>
        <button
          type="button"
          aria-label="Remove entry"
          class="ml-3 text-neutral-600 hover:text-neutral-400"
          @click="historyStore.removeEntry(entry.id)"
        >
          ✕
        </button>
      </li>
    </ul>
  </section>
</template>
