export interface CommissionInputs {
  revenue: number
  commissionRate: number
}

export interface CommissionResults {
  commissionAmount: number
  netAmount: number
}

export function calculateCommission(inputs: CommissionInputs): CommissionResults {
  const revenue = inputs.revenue ?? 0
  const commissionRate = inputs.commissionRate ?? 0
  const commissionAmount = revenue * (commissionRate / 100)
  const netAmount = revenue - commissionAmount
  return { commissionAmount, netAmount }
}
