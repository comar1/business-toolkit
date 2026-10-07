import { defineStore } from 'pinia'
import type { SharedValues } from '~/utils/calc/types'

export const useSharedValuesStore = defineStore('sharedValues', {
  state: (): { values: SharedValues; sources: Partial<Record<keyof SharedValues, string>>; hydrated: boolean } => ({
    values: {},
    sources: {},
    hydrated: false,
  }),
  actions: {
    hydrate() {
      if (this.hydrated) return
      const state = useHistoryStorage().loadSharedValues()
      this.values = state.values
      this.sources = state.sources
      this.hydrated = true
    },
    update(partial: Partial<SharedValues>, sourceName: string) {
      this.hydrate()
      for (const [key, value] of Object.entries(partial)) {
        if (value !== undefined && !Number.isNaN(value)) {
          this.values[key as keyof SharedValues] = value
          this.sources[key as keyof SharedValues] = sourceName
        }
      }
      useHistoryStorage().saveSharedValues({ values: this.values, sources: this.sources })
    },
  },
})
