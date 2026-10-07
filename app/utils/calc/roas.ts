export interface RoasInputs {
  revenue: number
  adSpend: number
}

export interface RoasResults {
  roas: number
}

export function calculateRoas(inputs: RoasInputs): RoasResults {
  const revenue = inputs.revenue ?? 0
  const adSpend = inputs.adSpend ?? 0
  const roas = adSpend === 0 ? 0 : revenue / adSpend
  return { roas }
}
