import { describe, expect, it } from 'vitest'
import { calculateCashFlow } from './cash-flow'

describe('calculateCashFlow', () => {
  it('computes net cash flow and closing balance for typical values', () => {
    const result = calculateCashFlow({ revenue: 100000, cost: 60000, openingBalance: 20000 })
    expect(result.netCashFlow).toBe(40000)
    expect(result.closingBalance).toBe(60000)
  })

  it('handles zero cash in and out', () => {
    const result = calculateCashFlow({ revenue: 0, cost: 0, openingBalance: 5000 })
    expect(result.netCashFlow).toBe(0)
    expect(result.closingBalance).toBe(5000)
  })

  it('handles negative net cash flow (cash out exceeds cash in)', () => {
    const result = calculateCashFlow({ revenue: 10000, cost: 25000, openingBalance: 5000 })
    expect(result.netCashFlow).toBe(-15000)
    expect(result.closingBalance).toBe(-10000)
  })

  it('handles a negative opening balance without throwing', () => {
    const result = calculateCashFlow({ revenue: 10000, cost: 5000, openingBalance: -2000 })
    expect(result.closingBalance).toBe(3000)
  })

  it('handles very large values', () => {
    const result = calculateCashFlow({ revenue: 1e9, cost: 4e8, openingBalance: 1e8 })
    expect(result.netCashFlow).toBe(6e8)
    expect(result.closingBalance).toBe(7e8)
  })
})
