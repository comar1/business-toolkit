export interface CashFlowInputs {
  revenue: number
  cost: number
  openingBalance: number
}

export interface CashFlowResults {
  netCashFlow: number
  closingBalance: number
}

export function calculateCashFlow(inputs: CashFlowInputs): CashFlowResults {
  const revenue = inputs.revenue ?? 0
  const cost = inputs.cost ?? 0
  const openingBalance = inputs.openingBalance ?? 0
  const netCashFlow = revenue - cost
  const closingBalance = openingBalance + netCashFlow
  return { netCashFlow, closingBalance }
}
