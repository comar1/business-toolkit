import { describe, expect, it } from 'vitest'
import { calculateBreakEven } from './break-even'

describe('calculateBreakEven', () => {
  it('computes break-even units and revenue for typical values', () => {
    const result = calculateBreakEven({ fixedCosts: 200000, price: 500, cost: 300 })
    expect(result.contributionMargin).toBe(200)
    expect(result.breakEvenUnits).toBe(1000)
    expect(result.breakEvenRevenue).toBe(500000)
  })

  it('returns zero when contribution margin is zero (no division by zero)', () => {
    const result = calculateBreakEven({ fixedCosts: 100000, price: 300, cost: 300 })
    expect(result.contributionMargin).toBe(0)
    expect(result.breakEvenUnits).toBe(0)
  })

  it('returns zero when variable cost exceeds price (negative contribution margin)', () => {
    const result = calculateBreakEven({ fixedCosts: 100000, price: 200, cost: 300 })
    expect(result.contributionMargin).toBe(-100)
    expect(result.breakEvenUnits).toBe(0)
  })

  it('returns zero break-even units when fixed costs are zero', () => {
    const result = calculateBreakEven({ fixedCosts: 0, price: 500, cost: 300 })
    expect(result.breakEvenUnits).toBe(0)
  })

  it('handles very large values', () => {
    const result = calculateBreakEven({ fixedCosts: 1e8, price: 1000, cost: 800 })
    expect(result.breakEvenUnits).toBe(500000)
  })
})
