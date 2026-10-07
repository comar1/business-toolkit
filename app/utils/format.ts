import type { ValueFormat } from './calc/types'

export function formatValue(value: number | undefined, format: ValueFormat): string {
  if (value === undefined || !Number.isFinite(value)) return '—'
  switch (format) {
    case 'currency':
      return `₱${value.toLocaleString('en-PH', { maximumFractionDigits: 2 })}`
    case 'percent':
      return `${value.toLocaleString('en-PH', { maximumFractionDigits: 2 })}%`
    case 'ratio':
      return `${value.toLocaleString('en-PH', { maximumFractionDigits: 2 })}x`
    case 'units':
      return `${Math.round(value).toLocaleString('en-PH')} units`
    case 'number':
    default:
      return value.toLocaleString('en-PH', { maximumFractionDigits: 2 })
  }
}
