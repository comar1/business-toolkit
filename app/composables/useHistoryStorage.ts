import type { HistoryEntry, SharedValues } from '~/utils/calc/types'

const HISTORY_KEY = 'business-toolkit:history'
const SHARED_VALUES_KEY = 'business-toolkit:shared-values'

export interface SharedValuesState {
  values: SharedValues
  /** Which calculator's name last set each shared field, for the "from your X calculation" badge. */
  sources: Partial<Record<keyof SharedValues, string>>
}

/**
 * Storage adapter boundary for session data. Phase 1 reads and writes
 * sessionStorage only — never localStorage, never the network. Phase 2 swaps
 * this composable for an API-backed adapter without touching the stores
 * that call it.
 */
export function useHistoryStorage() {
  function loadHistory(): HistoryEntry[] {
    if (!import.meta.client) return []
    try {
      const raw = sessionStorage.getItem(HISTORY_KEY)
      return raw ? (JSON.parse(raw) as HistoryEntry[]) : []
    } catch {
      return []
    }
  }

  function saveHistory(entries: HistoryEntry[]): void {
    if (!import.meta.client) return
    sessionStorage.setItem(HISTORY_KEY, JSON.stringify(entries))
  }

  function clearHistory(): void {
    if (!import.meta.client) return
    sessionStorage.removeItem(HISTORY_KEY)
  }

  function loadSharedValues(): SharedValuesState {
    if (!import.meta.client) return { values: {}, sources: {} }
    try {
      const raw = sessionStorage.getItem(SHARED_VALUES_KEY)
      return raw ? (JSON.parse(raw) as SharedValuesState) : { values: {}, sources: {} }
    } catch {
      return { values: {}, sources: {} }
    }
  }

  function saveSharedValues(state: SharedValuesState): void {
    if (!import.meta.client) return
    sessionStorage.setItem(SHARED_VALUES_KEY, JSON.stringify(state))
  }

  return { loadHistory, saveHistory, clearHistory, loadSharedValues, saveSharedValues }
}
