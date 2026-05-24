import { createContext, useContext, type ReactNode } from 'react'
import { useFees } from './useFees.ts'

const FeesContext = createContext<ReturnType<typeof useFees> | null>(null)

export function FeesProvider({ children }: { children: ReactNode }) {
  return <FeesContext.Provider value={useFees()}>{children}</FeesContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFeesContext() {
  const ctx = useContext(FeesContext)
  if (!ctx) throw new Error('useFeesContext must be used inside FeesProvider')
  return ctx
}
