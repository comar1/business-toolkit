import { describe, expect, it } from 'vitest'
import { calculateInvoice } from './invoice'

describe('calculateInvoice', () => {
  it('computes tax amount and total for typical values', () => {
    const result = calculateInvoice({ revenue: 50000, taxRate: 12 })
    expect(result.taxAmount).toBe(6000)
    expect(result.total).toBe(56000)
  })

  it('returns subtotal as total when tax rate is zero', () => {
    const result = calculateInvoice({ revenue: 50000, taxRate: 0 })
    expect(result.taxAmount).toBe(0)
    expect(result.total).toBe(50000)
  })

  it('returns zero total when subtotal is zero', () => {
    const result = calculateInvoice({ revenue: 0, taxRate: 12 })
    expect(result.total).toBe(0)
  })

  it('handles negative subtotal without throwing', () => {
    const result = calculateInvoice({ revenue: -1000, taxRate: 12 })
    expect(Number.isFinite(result.total)).toBe(true)
  })

  it('handles very large values', () => {
    const result = calculateInvoice({ revenue: 1e9, taxRate: 12 })
    expect(result.taxAmount).toBe(1.2e8)
    expect(result.total).toBe(1.12e9)
  })
})
