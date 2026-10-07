import { describe, expect, it } from 'vitest'
import { calculateDiscount } from './discount'

describe('calculateDiscount', () => {
  it('computes discount amount and final price for typical values', () => {
    const result = calculateDiscount({ price: 1000, discountPercent: 20 })
    expect(result.discountAmount).toBe(200)
    expect(result.finalPrice).toBe(800)
  })

  it('returns no discount when discountPercent is zero', () => {
    const result = calculateDiscount({ price: 1000, discountPercent: 0 })
    expect(result.discountAmount).toBe(0)
    expect(result.finalPrice).toBe(1000)
  })

  it('returns zero final price when price is zero', () => {
    const result = calculateDiscount({ price: 0, discountPercent: 50 })
    expect(result.discountAmount).toBe(0)
    expect(result.finalPrice).toBe(0)
  })

  it('handles a discount over 100 percent (negative final price)', () => {
    const result = calculateDiscount({ price: 1000, discountPercent: 150 })
    expect(result.finalPrice).toBe(-500)
  })

  it('handles very large values', () => {
    const result = calculateDiscount({ price: 1e9, discountPercent: 10 })
    expect(result.discountAmount).toBe(1e8)
    expect(result.finalPrice).toBe(9e8)
  })
})
