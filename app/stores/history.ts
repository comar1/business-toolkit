import { defineStore } from 'pinia'
import type { CalculatorId, HistoryEntry } from '~/utils/calc/types'

const MAX_ENTRIES = 50

export const useHistoryStore = defineStore('history', {
  state: (): { entries: HistoryEntry[]; hydrated: boolean } => ({
    entries: [],
    hydrated: false,
  }),
  getters: {
    /** Most recent calculation per calculator, newest first. */
    latestByCalculator(state): Partial<Record<CalculatorId, HistoryEntry>> {
      const latest: Partial<Record<CalculatorId, HistoryEntry>> = {}
      // entries are stored newest-first, so the first match per id is the latest.
      for (const entry of state.entries) {
        if (!latest[entry.calculator]) {
          latest[entry.calculator] = entry
        }
      }
      return latest
    },
    toolsUsedCount(): number {
      return Object.keys(this.latestByCalculator).length
    },
  },
  actions: {
    hydrate() {
      if (this.hydrated) return
      this.entries = useHistoryStorage().loadHistory()
      this.hydrated = true
    },
    addEntry(calculator: CalculatorId, inputs: Record<string, number>, results: Record<string, number>) {
      this.hydrate()
      const entry: HistoryEntry = {
        id: import.meta.client ? crypto.randomUUID() : '',
        calculator,
        inputs,
        results,
        createdAt: new Date().toISOString(),
      }
      this.entries = [entry, ...this.entries].slice(0, MAX_ENTRIES)
      useHistoryStorage().saveHistory(this.entries)
      return entry
    },
    removeEntry(id: string) {
      this.entries = this.entries.filter((entry) => entry.id !== id)
      useHistoryStorage().saveHistory(this.entries)
    },
    clearAll() {
      this.entries = []
      useHistoryStorage().clearHistory()
    },
  },
})
