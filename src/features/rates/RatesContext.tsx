import { createContext, useContext, type ReactNode } from 'react'
import { useRates } from './useRates.ts'

const RatesContext = createContext<ReturnType<typeof useRates> | null>(null)

export function RatesProvider({ children }: { children: ReactNode }) {
  return <RatesContext.Provider value={useRates()}>{children}</RatesContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRatesContext() {
  const ctx = useContext(RatesContext)
  if (!ctx) throw new Error('useRatesContext must be used inside RatesProvider')
  return ctx
}
