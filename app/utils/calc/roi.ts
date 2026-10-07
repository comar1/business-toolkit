export interface RoiInputs {
  revenue: number
  cost: number
}

export interface RoiResults {
  netGain: number
  roi: number
}

export function calculateRoi(inputs: RoiInputs): RoiResults {
  const revenue = inputs.revenue ?? 0
  const cost = inputs.cost ?? 0
  const netGain = revenue - cost
  const roi = cost === 0 ? 0 : (netGain / cost) * 100
  return { netGain, roi }
}
