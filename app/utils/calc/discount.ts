export interface DiscountInputs {
  price: number
  discountPercent: number
}

export interface DiscountResults {
  discountAmount: number
  finalPrice: number
}

export function calculateDiscount(inputs: DiscountInputs): DiscountResults {
  const price = inputs.price ?? 0
  const discountPercent = inputs.discountPercent ?? 0
  const discountAmount = price * (discountPercent / 100)
  const finalPrice = price - discountAmount
  return { discountAmount, finalPrice }
}
