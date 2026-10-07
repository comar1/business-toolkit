import { describe, expect, it } from 'vitest'
import { calculateMarkup } from './markup'

describe('calculateMarkup', () => {
  it('computes profit and markup for typical values', () => {
    const result = calculateMarkup({ cost: 70000, price: 100000 })
    expect(result.profit).toBe(30000)
    expect(result.markup).toBeCloseTo(42.8571, 3)
  })

  it('returns zero markup when cost is zero (no division by zero)', () => {
    const result = calculateMarkup({ cost: 0, price: 500 })
    expect(result.profit).toBe(500)
    expect(result.markup).toBe(0)
  })

  it('handles price lower than cost (negative markup)', () => {
    const result = calculateMarkup({ cost: 1000, price: 800 })
    expect(result.profit).toBe(-200)
    expect(result.markup).toBeCloseTo(-20)
  })

  it('handles negative cost input without throwing', () => {
    const result = calculateMarkup({ cost: -100, price: 50 })
    expect(Number.isFinite(result.markup)).toBe(true)
  })

  it('handles very large values', () => {
    const result = calculateMarkup({ cost: 2e11, price: 5e11 })
    expect(result.profit).toBe(3e11)
    expect(result.markup).toBeCloseTo(150)
  })
})
