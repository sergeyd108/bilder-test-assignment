import { useRatesContext } from '@/features/rates'
import type { Fee } from './types.ts'

export function useCurrencyPairs(currentFee: Fee, fees: Fee[]) {
  const { currencies } = useRatesContext()

  const takenFromCurrencies = new Set([
    currentFee.to,
    ...fees.filter((fee) => fee.to === currentFee.to).map((fee) => fee.from),
  ])
  const takenToCurrencies = new Set([
    currentFee.from,
    ...fees.filter((fee) => fee.from === currentFee.from).map((fee) => fee.to),
  ])

  const fromCurrencies = currencies.filter((currency) => !takenFromCurrencies.has(currency))
  const toCurrencies = currencies.filter((currency) => !takenToCurrencies.has(currency))

  return { fromCurrencies, toCurrencies }
}
