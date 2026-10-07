import { calculateProfitMargin } from '~/utils/calc/profit-margin'
import { calculateMarkup } from '~/utils/calc/markup'
import { calculateDiscount } from '~/utils/calc/discount'
import { calculateRoas } from '~/utils/calc/roas'
import { calculateRoi } from '~/utils/calc/roi'
import { calculateCommission } from '~/utils/calc/commission'
import { calculateBreakEven } from '~/utils/calc/break-even'
import { calculateCashFlow } from '~/utils/calc/cash-flow'
import { calculateTax } from '~/utils/calc/tax'
import { calculateInvoice } from '~/utils/calc/invoice'
import type {
  CalculatorCategory,
  CalculatorField,
  CalculatorId,
  NextStepLink,
  ResultField,
  SharedValues,
} from '~/utils/calc/types'

export interface CalculatorDefinition {
  id: CalculatorId
  /** Route slug, e.g. "profit-margin-calculator" (matches the README route table). */
  slug: string
  name: string
  category: CalculatorCategory
  categoryLabel: string
  shortDescription: string
  fields: CalculatorField[]
  resultFields: ResultField[]
  nextSteps: NextStepLink[]
  calculate: (inputs: Record<string, number>) => Record<string, number>
  /** Values to write into the session-wide SharedValues after a calculation. */
  toShared: (inputs: Record<string, number>, results: Record<string, number>) => Partial<SharedValues>
  /** Which of this calculator's fields can be pre-filled from SharedValues. */
  fromShared: (shared: SharedValues) => Partial<Record<string, number>>
}

const categoryLabels: Record<CalculatorCategory, string> = {
  pricing: 'Pricing',
  marketing: 'Marketing',
  finance: 'Finance',
}

export const calculators: CalculatorDefinition[] = [
  {
    id: 'profit-margin',
    slug: 'profit-margin-calculator',
    name: 'Profit Margin Calculator',
    category: 'pricing',
    categoryLabel: categoryLabels.pricing,
    shortDescription: 'Find out how much profit you keep from every sale.',
    fields: [
      { key: 'revenue', label: 'Revenue', format: 'currency', placeholder: 100000 },
      { key: 'cost', label: 'Cost of goods', format: 'currency', placeholder: 70000 },
    ],
    resultFields: [
      { key: 'profit', label: 'Profit', format: 'currency', primary: true },
      { key: 'margin', label: 'Margin', format: 'percent' },
    ],
    nextSteps: [
      { id: 'break-even', question: 'How much do you need to sell to cover costs?' },
      { id: 'markup', question: 'What markup does this margin represent?' },
    ],
    calculate: (inputs) => calculateProfitMargin({ revenue: inputs.revenue ?? 0, cost: inputs.cost ?? 0 }),
    toShared: (inputs) => ({ revenue: inputs.revenue, cost: inputs.cost }),
    fromShared: (shared) => ({ revenue: shared.revenue, cost: shared.cost }),
  },
  {
    id: 'markup',
    slug: 'markup-calculator',
    name: 'Markup Calculator',
    category: 'pricing',
    categoryLabel: categoryLabels.pricing,
    shortDescription: 'Work out your markup percentage from cost to selling price.',
    fields: [
      { key: 'cost', label: 'Cost', format: 'currency', placeholder: 70000 },
      { key: 'price', label: 'Selling price', format: 'currency', placeholder: 100000 },
    ],
    resultFields: [
      { key: 'profit', label: 'Profit', format: 'currency', primary: true },
      { key: 'markup', label: 'Markup', format: 'percent' },
    ],
    nextSteps: [
      { id: 'profit-margin', question: 'What margin does this markup give you?' },
      { id: 'discount', question: 'How much can you discount and stay profitable?' },
    ],
    calculate: (inputs) => calculateMarkup({ cost: inputs.cost ?? 0, price: inputs.price ?? 0 }),
    toShared: (inputs) => ({ cost: inputs.cost, price: inputs.price }),
    fromShared: (shared) => ({ cost: shared.cost, price: shared.price }),
  },
  {
    id: 'discount',
    slug: 'discount-calculator',
    name: 'Discount Calculator',
    category: 'pricing',
    categoryLabel: categoryLabels.pricing,
    shortDescription: 'Calculate the final price and savings for any discount.',
    fields: [
      { key: 'price', label: 'Original price', format: 'currency', placeholder: 1000 },
      { key: 'discountPercent', label: 'Discount', format: 'percent', placeholder: 20 },
    ],
    resultFields: [
      { key: 'finalPrice', label: 'Final price', format: 'currency', primary: true },
      { key: 'discountAmount', label: 'You save', format: 'currency' },
    ],
    nextSteps: [{ id: 'profit-margin', question: "What's your margin after the discount?" }],
    calculate: (inputs) =>
      calculateDiscount({ price: inputs.price ?? 0, discountPercent: inputs.discountPercent ?? 0 }),
    toShared: (_inputs, results) => ({ price: results.finalPrice }),
    fromShared: (shared) => ({ price: shared.price }),
  },
  {
    id: 'roas',
    slug: 'roas-calculator',
    name: 'ROAS Calculator',
    category: 'marketing',
    categoryLabel: categoryLabels.marketing,
    shortDescription: 'Measure return on ad spend for a campaign.',
    fields: [
      { key: 'revenue', label: 'Revenue from ads', format: 'currency', placeholder: 50000 },
      { key: 'adSpend', label: 'Ad spend', format: 'currency', placeholder: 12000 },
    ],
    resultFields: [{ key: 'roas', label: 'ROAS', format: 'ratio', primary: true }],
    nextSteps: [
      { id: 'roi', question: 'Is this ad spend actually profitable?' },
      { id: 'profit-margin', question: 'What margin are you left with on ad-driven sales?' },
    ],
    calculate: (inputs) => calculateRoas({ revenue: inputs.revenue ?? 0, adSpend: inputs.adSpend ?? 0 }),
    toShared: (inputs) => ({ revenue: inputs.revenue, adSpend: inputs.adSpend }),
    fromShared: (shared) => ({ revenue: shared.revenue, adSpend: shared.adSpend }),
  },
  {
    id: 'roi',
    slug: 'roi-calculator',
    name: 'ROI Calculator',
    category: 'marketing',
    categoryLabel: categoryLabels.marketing,
    shortDescription: 'Work out the return on any business investment.',
    fields: [
      { key: 'revenue', label: 'Total return', format: 'currency', placeholder: 15000 },
      { key: 'cost', label: 'Investment cost', format: 'currency', placeholder: 10000 },
    ],
    resultFields: [
      { key: 'netGain', label: 'Net gain', format: 'currency', primary: true },
      { key: 'roi', label: 'ROI', format: 'percent' },
    ],
    nextSteps: [{ id: 'cash-flow', question: 'How does this affect your cash position?' }],
    calculate: (inputs) => calculateRoi({ revenue: inputs.revenue ?? 0, cost: inputs.cost ?? 0 }),
    toShared: (inputs) => ({ revenue: inputs.revenue, cost: inputs.cost }),
    fromShared: (shared) => ({ revenue: shared.revenue, cost: shared.cost }),
  },
  {
    id: 'commission',
    slug: 'commission-calculator',
    name: 'Commission Calculator',
    category: 'marketing',
    categoryLabel: categoryLabels.marketing,
    shortDescription: 'Find out what a sale is worth after commission.',
    fields: [
      { key: 'revenue', label: 'Sale amount', format: 'currency', placeholder: 100000 },
      { key: 'commissionRate', label: 'Commission rate', format: 'percent', placeholder: 5 },
    ],
    resultFields: [
      { key: 'netAmount', label: 'You keep', format: 'currency', primary: true },
      { key: 'commissionAmount', label: 'Commission', format: 'currency' },
    ],
    nextSteps: [{ id: 'profit-margin', question: "What's left after commissions?" }],
    calculate: (inputs) =>
      calculateCommission({ revenue: inputs.revenue ?? 0, commissionRate: inputs.commissionRate ?? 0 }),
    toShared: (inputs, results) => ({ revenue: inputs.revenue, cost: results.commissionAmount }),
    fromShared: (shared) => ({ revenue: shared.revenue }),
  },
  {
    id: 'break-even',
    slug: 'break-even-calculator',
    name: 'Break-even Calculator',
    category: 'finance',
    categoryLabel: categoryLabels.finance,
    shortDescription: 'Find out how many units you need to sell to cover costs.',
    fields: [
      { key: 'fixedCosts', label: 'Fixed costs', format: 'currency', placeholder: 200000 },
      { key: 'price', label: 'Price per unit', format: 'currency', placeholder: 500 },
      { key: 'cost', label: 'Variable cost per unit', format: 'currency', placeholder: 300 },
    ],
    resultFields: [
      { key: 'breakEvenUnits', label: 'Break-even units', format: 'units', primary: true },
      { key: 'breakEvenRevenue', label: 'Break-even revenue', format: 'currency' },
    ],
    nextSteps: [{ id: 'cash-flow', question: 'When will you have the cash to get there?' }],
    calculate: (inputs) =>
      calculateBreakEven({ fixedCosts: inputs.fixedCosts ?? 0, price: inputs.price ?? 0, cost: inputs.cost ?? 0 }),
    toShared: (inputs) => ({ fixedCosts: inputs.fixedCosts, price: inputs.price, cost: inputs.cost }),
    fromShared: (shared) => ({ fixedCosts: shared.fixedCosts, price: shared.price, cost: shared.cost }),
  },
  {
    id: 'cash-flow',
    slug: 'cash-flow-calculator',
    name: 'Cash Flow Calculator',
    category: 'finance',
    categoryLabel: categoryLabels.finance,
    shortDescription: 'See how cash in and cash out change your balance.',
    fields: [
      { key: 'revenue', label: 'Cash in', format: 'currency', placeholder: 100000 },
      { key: 'cost', label: 'Cash out', format: 'currency', placeholder: 60000 },
      { key: 'openingBalance', label: 'Opening balance', format: 'currency', placeholder: 20000 },
    ],
    resultFields: [
      { key: 'closingBalance', label: 'Closing balance', format: 'currency', primary: true },
      { key: 'netCashFlow', label: 'Net cash flow', format: 'currency' },
    ],
    nextSteps: [{ id: 'tax', question: 'Set aside enough for taxes.' }],
    calculate: (inputs) =>
      calculateCashFlow({
        revenue: inputs.revenue ?? 0,
        cost: inputs.cost ?? 0,
        openingBalance: inputs.openingBalance ?? 0,
      }),
    toShared: (inputs) => ({ revenue: inputs.revenue, cost: inputs.cost }),
    fromShared: (shared) => ({ revenue: shared.revenue, cost: shared.cost }),
  },
  {
    id: 'tax',
    slug: 'tax-calculator',
    name: 'Tax Calculator',
    category: 'finance',
    categoryLabel: categoryLabels.finance,
    shortDescription: 'Estimate the tax due on a given amount.',
    fields: [
      { key: 'revenue', label: 'Taxable amount', format: 'currency', placeholder: 100000 },
      { key: 'taxRate', label: 'Tax rate', format: 'percent', placeholder: 12 },
    ],
    resultFields: [
      { key: 'netAmount', label: 'Net amount', format: 'currency', primary: true },
      { key: 'taxAmount', label: 'Tax due', format: 'currency' },
    ],
    nextSteps: [{ id: 'invoice', question: 'Create an invoice with tax included.' }],
    calculate: (inputs) => calculateTax({ revenue: inputs.revenue ?? 0, taxRate: inputs.taxRate ?? 0 }),
    toShared: (inputs) => ({ revenue: inputs.revenue, taxRate: inputs.taxRate }),
    fromShared: (shared) => ({ revenue: shared.revenue, taxRate: shared.taxRate }),
  },
  {
    id: 'invoice',
    slug: 'invoice-calculator',
    name: 'Invoice Calculator',
    category: 'finance',
    categoryLabel: categoryLabels.finance,
    shortDescription: 'Add tax to a subtotal and get an invoice total.',
    fields: [
      { key: 'revenue', label: 'Subtotal', format: 'currency', placeholder: 50000 },
      { key: 'taxRate', label: 'Tax rate', format: 'percent', placeholder: 12 },
    ],
    resultFields: [
      { key: 'total', label: 'Invoice total', format: 'currency', primary: true },
      { key: 'taxAmount', label: 'Tax', format: 'currency' },
    ],
    nextSteps: [{ id: 'cash-flow', question: 'Track when this payment lands.' }],
    calculate: (inputs) => calculateInvoice({ revenue: inputs.revenue ?? 0, taxRate: inputs.taxRate ?? 0 }),
    toShared: (inputs) => ({ revenue: inputs.revenue, taxRate: inputs.taxRate }),
    fromShared: (shared) => ({ revenue: shared.revenue, taxRate: shared.taxRate }),
  },
]

export function getCalculatorBySlug(slug: string): CalculatorDefinition | undefined {
  return calculators.find((calculator) => calculator.slug === slug)
}

export function getCalculatorById(id: CalculatorId): CalculatorDefinition | undefined {
  return calculators.find((calculator) => calculator.id === id)
}

export function calculatorsByCategory(): { category: CalculatorCategory; label: string; items: CalculatorDefinition[] }[] {
  const order: CalculatorCategory[] = ['pricing', 'marketing', 'finance']
  return order.map((category) => ({
    category,
    label: categoryLabels[category],
    items: calculators.filter((calculator) => calculator.category === category),
  }))
}
