import { describe, expect, it } from 'vitest'
import { calculateProfitMargin } from './profit-margin'

describe('calculateProfitMargin', () => {
  it('computes profit and margin for typical values', () => {
    const result = calculateProfitMargin({ revenue: 100000, cost: 70000 })
    expect(result.profit).toBe(30000)
    expect(result.margin).toBeCloseTo(30)
  })

  it('returns zero margin when revenue is zero (no division by zero)', () => {
    const result = calculateProfitMargin({ revenue: 0, cost: 0 })
    expect(result.profit).toBe(0)
    expect(result.margin).toBe(0)
  })

  it('handles cost greater than revenue (negative profit/margin)', () => {
    const result = calculateProfitMargin({ revenue: 50000, cost: 80000 })
    expect(result.profit).toBe(-30000)
    expect(result.margin).toBeCloseTo(-60)
  })

  it('handles negative revenue input without throwing', () => {
    const result = calculateProfitMargin({ revenue: -1000, cost: 500 })
    expect(result.profit).toBe(-1500)
    expect(Number.isFinite(result.margin)).toBe(true)
  })

  it('handles very large values', () => {
    const result = calculateProfitMargin({ revenue: 1e12, cost: 4e11 })
    expect(result.profit).toBe(6e11)
    expect(result.margin).toBeCloseTo(60)
  })
})
