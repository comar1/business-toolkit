export interface BreakEvenInputs {
  fixedCosts: number
  price: number
  cost: number
}

export interface BreakEvenResults {
  contributionMargin: number
  breakEvenUnits: number
  breakEvenRevenue: number
}

export function calculateBreakEven(inputs: BreakEvenInputs): BreakEvenResults {
  const fixedCosts = inputs.fixedCosts ?? 0
  const price = inputs.price ?? 0
  const cost = inputs.cost ?? 0
  const contributionMargin = price - cost

  // When the contribution margin is zero or negative, each unit sold never
  // recovers its own variable cost, so break-even is unreachable — report 0
  // rather than dividing by zero or a negative number.
  const breakEvenUnits = contributionMargin <= 0 ? 0 : fixedCosts / contributionMargin
  const breakEvenRevenue = breakEvenUnits * price

  return { contributionMargin, breakEvenUnits, breakEvenRevenue }
}
