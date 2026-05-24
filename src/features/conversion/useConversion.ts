import { defaultFee } from '@/constants'
import { type RatesMap, useRatesContext } from '@/features/rates'
import { type Fee, useFeesContext } from '@/features/fees'

export interface ConversionResult {
  amount?: number
  from: string
  to: string
  fee: number
  rate: number
  result: number
}

function getFee(fees: Fee[], from: string, to: string) {
  const match = fees.find((fee) => fee.from === from && fee.to === to)
  return match?.fee ?? defaultFee
}

function getCrossRate(rates: RatesMap, from: string, to: string) {
  const rateFrom = rates[from] ?? 1
  const rateTo = rates[to] ?? 1
  return rateTo / rateFrom
}

export function useConversion(from: string, to: string, amount?: number): ConversionResult {
  const { rates } = useRatesContext()
  const { fees } = useFeesContext()

  if (!rates || !amount) {
    return { from, to, fee: 0, rate: 0, result: 0 }
  }

  const fee = getFee(fees, from, to)
  const rate = getCrossRate(rates, from, to)
  const result = amount * (1 - fee) * rate

  return { fee, rate, result, from, to, amount }
}
