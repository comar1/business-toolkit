import { describe, expect, it } from 'vitest'
import { calculateCommission } from './commission'

describe('calculateCommission', () => {
  it('computes commission amount and net amount for typical values', () => {
    const result = calculateCommission({ revenue: 100000, commissionRate: 5 })
    expect(result.commissionAmount).toBe(5000)
    expect(result.netAmount).toBe(95000)
  })

  it('returns zero commission when rate is zero', () => {
    const result = calculateCommission({ revenue: 100000, commissionRate: 0 })
    expect(result.commissionAmount).toBe(0)
    expect(result.netAmount).toBe(100000)
  })

  it('returns zero amounts when revenue is zero', () => {
    const result = calculateCommission({ revenue: 0, commissionRate: 10 })
    expect(result.commissionAmount).toBe(0)
    expect(result.netAmount).toBe(0)
  })

  it('handles a commission rate over 100 percent (negative net)', () => {
    const result = calculateCommission({ revenue: 1000, commissionRate: 120 })
    expect(result.netAmount).toBe(-200)
  })

  it('handles very large values', () => {
    const result = calculateCommission({ revenue: 1e9, commissionRate: 10 })
    expect(result.commissionAmount).toBe(1e8)
    expect(result.netAmount).toBe(9e8)
  })
})
