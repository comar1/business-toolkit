export interface TaxInputs {
  revenue: number
  taxRate: number
}

export interface TaxResults {
  taxAmount: number
  netAmount: number
}

export function calculateTax(inputs: TaxInputs): TaxResults {
  const revenue = inputs.revenue ?? 0
  const taxRate = inputs.taxRate ?? 0
  const taxAmount = revenue * (taxRate / 100)
  const netAmount = revenue - taxAmount
  return { taxAmount, netAmount }
}
