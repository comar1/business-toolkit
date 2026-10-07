import { describe, expect, it } from 'vitest'
import { calculateRoas } from './roas'

describe('calculateRoas', () => {
  it('computes roas for typical values', () => {
    const result = calculateRoas({ revenue: 50000, adSpend: 12000 })
    expect(result.roas).toBeCloseTo(4.1667, 3)
  })

  it('returns zero roas when ad spend is zero (no division by zero)', () => {
    const result = calculateRoas({ revenue: 50000, adSpend: 0 })
    expect(result.roas).toBe(0)
  })

  it('returns zero roas when revenue is zero', () => {
    const result = calculateRoas({ revenue: 0, adSpend: 5000 })
    expect(result.roas).toBe(0)
  })

  it('handles negative revenue without throwing', () => {
    const result = calculateRoas({ revenue: -1000, adSpend: 500 })
    expect(result.roas).toBe(-2)
  })

  it('handles very large values', () => {
    const result = calculateRoas({ revenue: 1e12, adSpend: 1e9 })
    expect(result.roas).toBeCloseTo(1000)
  })
})
