import { describe, expect, it } from 'vitest'
import { calculateTax } from './tax'

describe('calculateTax', () => {
  it('computes tax amount and net amount for typical values', () => {
    const result = calculateTax({ revenue: 100000, taxRate: 12 })
    expect(result.taxAmount).toBe(12000)
    expect(result.netAmount).toBe(88000)
  })

  it('returns zero tax when rate is zero', () => {
    const result = calculateTax({ revenue: 100000, taxRate: 0 })
    expect(result.taxAmount).toBe(0)
    expect(result.netAmount).toBe(100000)
  })

  it('returns zero amounts when revenue is zero', () => {
    const result = calculateTax({ revenue: 0, taxRate: 12 })
    expect(result.taxAmount).toBe(0)
    expect(result.netAmount).toBe(0)
  })

  it('handles negative revenue without throwing', () => {
    const result = calculateTax({ revenue: -1000, taxRate: 12 })
    expect(Number.isFinite(result.taxAmount)).toBe(true)
  })

  it('handles very large values', () => {
    const result = calculateTax({ revenue: 1e9, taxRate: 12 })
    expect(result.taxAmount).toBe(1.2e8)
    expect(result.netAmount).toBe(8.8e8)
  })
})
