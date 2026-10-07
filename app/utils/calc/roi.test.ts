import { describe, expect, it } from 'vitest'
import { calculateRoi } from './roi'

describe('calculateRoi', () => {
  it('computes net gain and roi for typical values', () => {
    const result = calculateRoi({ revenue: 15000, cost: 10000 })
    expect(result.netGain).toBe(5000)
    expect(result.roi).toBeCloseTo(50)
  })

  it('returns zero roi when cost is zero (no division by zero)', () => {
    const result = calculateRoi({ revenue: 5000, cost: 0 })
    expect(result.netGain).toBe(5000)
    expect(result.roi).toBe(0)
  })

  it('handles a loss (negative roi)', () => {
    const result = calculateRoi({ revenue: 8000, cost: 10000 })
    expect(result.netGain).toBe(-2000)
    expect(result.roi).toBeCloseTo(-20)
  })

  it('handles negative cost input without throwing', () => {
    const result = calculateRoi({ revenue: 1000, cost: -500 })
    expect(Number.isFinite(result.roi)).toBe(true)
  })

  it('handles very large values', () => {
    const result = calculateRoi({ revenue: 3e11, cost: 1e11 })
    expect(result.roi).toBeCloseTo(200)
  })
})
