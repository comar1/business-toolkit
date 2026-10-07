import { defineStore } from 'pinia'
import { calculators, calculatorsByCategory, type CalculatorDefinition } from '~/config/calculators'
import { useHistoryStore } from './history'
import type { CalculatorId, ValueFormat } from '~/utils/calc/types'

export interface SnapshotFigure {
  calculatorId: CalculatorId
  calculatorName: string
  slug: string
  label: string
  format: ValueFormat
  value: number
}

export interface SnapshotCategory {
  category: string
  label: string
  figures: SnapshotFigure[]
}

/**
 * The Business Snapshot has no storage of its own — it is derived live from
 * the history store's "latest result per calculator" so it can never drift
 * out of sync with what the user actually calculated.
 */
export const useSnapshotStore = defineStore('snapshot', {
  getters: {
    categories(): SnapshotCategory[] {
      const history = useHistoryStore()
      return calculatorsByCategory()
        .map(({ category, label, items }) => {
          const figures: SnapshotFigure[] = []
          for (const calculator of items) {
            const entry = history.latestByCalculator[calculator.id]
            if (!entry) continue
            const primary = calculator.resultFields.find((field) => field.primary) ?? calculator.resultFields[0]
            if (!primary || !(primary.key in entry.results)) continue
            figures.push({
              calculatorId: calculator.id,
              calculatorName: calculator.name,
              slug: calculator.slug,
              label: primary.label,
              format: primary.format,
              value: entry.results[primary.key],
            })
          }
          return { category, label, figures }
        })
        .filter((group) => group.figures.length > 0)
    },
    notYetUsed(): CalculatorDefinition[] {
      const history = useHistoryStore()
      return calculators.filter((calculator) => !history.latestByCalculator[calculator.id])
    },
    stats(): { calculations: number; toolsUsed: number } {
      const history = useHistoryStore()
      return { calculations: history.entries.length, toolsUsed: history.toolsUsedCount }
    },
    isEmpty(): boolean {
      const history = useHistoryStore()
      return history.entries.length === 0
    },
  },
})
