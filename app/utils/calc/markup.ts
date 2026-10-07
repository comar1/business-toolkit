export interface MarkupInputs {
  cost: number
  price: number
}

export interface MarkupResults {
  profit: number
  markup: number
}

export function calculateMarkup(inputs: MarkupInputs): MarkupResults {
  const cost = inputs.cost ?? 0
  const price = inputs.price ?? 0
  const profit = price - cost
  const markup = cost === 0 ? 0 : (profit / cost) * 100
  return { profit, markup }
}
