import { defineStore } from 'pinia'
import type { CalculatorId, HistoryEntry } from '~/utils/calc/types'

/**
 * Tiny in-memory handoff for "click a history entry → reopen its calculator
 * with those exact inputs". Deliberately not persisted: it only needs to
 * survive the single client-side navigation that follows a click.
 */
export const useReopenStore = defineStore('reopen', {
  state: (): { pending: HistoryEntry | null } => ({ pending: null }),
  actions: {
    queue(entry: HistoryEntry) {
      this.pending = entry
    },
    consume(calculatorId: CalculatorId): Record<string, number> | null {
      if (this.pending && this.pending.calculator === calculatorId) {
        const inputs = this.pending.inputs
        this.pending = null
        return inputs
      }
      return null
    },
  },
})
