import { useState, useEffect } from 'react'
import { fetchRates, type RatesMap } from './ecbRates.ts'

export function useRates() {
  const [rates, setRates] = useState<RatesMap>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const currencies = Object.keys(rates ?? {}).sort()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    setError(undefined)
    fetchRates()
      .then(setRates)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to fetch rates'))
      .finally(() => setLoading(false))
  }, [])

  return { rates, currencies, loading, error }
}
