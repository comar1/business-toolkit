export interface InvoiceInputs {
  revenue: number
  taxRate: number
}

export interface InvoiceResults {
  taxAmount: number
  total: number
}

export function calculateInvoice(inputs: InvoiceInputs): InvoiceResults {
  const subtotal = inputs.revenue ?? 0
  const taxRate = inputs.taxRate ?? 0
  const taxAmount = subtotal * (taxRate / 100)
  const total = subtotal + taxAmount
  return { taxAmount, total }
}
