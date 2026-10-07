/**
 * Shared cross-calculator fields (README: "Carrying shared values forward").
 * Only values that genuinely carry meaning across calculators belong here —
 * calculator-specific inputs (e.g. discountPercent, commissionRate) stay local.
 */
export type SharedValues = {
  revenue?: number
  cost?: number
  price?: number
  fixedCosts?: number
  adSpend?: number
  taxRate?: number
}

export type SharedValueKey = keyof SharedValues

export type CalculatorId =
  | 'profit-margin'
  | 'markup'
  | 'discount'
  | 'roas'
  | 'roi'
  | 'commission'
  | 'break-even'
  | 'cash-flow'
  | 'tax'
  | 'invoice'

export type CalculatorCategory = 'pricing' | 'marketing' | 'finance'

/** How a numeric value should be formatted in inputs and results. */
export type ValueFormat = 'currency' | 'percent' | 'number' | 'ratio' | 'units'

export interface CalculatorField {
  /** Input key. When it matches a SharedValues key, the field is pre-fillable. */
  key: string
  label: string
  format: ValueFormat
  placeholder?: number
  min?: number
  help?: string
}

export interface ResultField {
  key: string
  label: string
  format: ValueFormat
  /** Shown as the headline figure for the result card. */
  primary?: boolean
}

export interface NextStepLink {
  id: CalculatorId
  question: string
}

export interface HistoryEntry {
  id: string
  calculator: CalculatorId
  inputs: Record<string, number>
  results: Record<string, number>
  createdAt: string
}
