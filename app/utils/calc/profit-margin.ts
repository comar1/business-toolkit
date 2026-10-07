export interface ProfitMarginInputs {
  revenue: number
  cost: number
}

export interface ProfitMarginResults {
  profit: number
  margin: number
}

export function calculateProfitMargin(inputs: ProfitMarginInputs): ProfitMarginResults {
  const revenue = inputs.revenue ?? 0
  const cost = inputs.cost ?? 0
  const profit = revenue - cost
  const margin = revenue === 0 ? 0 : (profit / revenue) * 100
  return { profit, margin }
}
