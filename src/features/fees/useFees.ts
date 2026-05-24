import { useEffect, useState } from 'react'
import type { Fee } from './types.ts'

const storageKey = 'conversion-fees'

function loadFees(): Fee[] {
  try {
    const raw = localStorage.getItem(storageKey)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveFees(fees: Fee[]) {
  localStorage.setItem(storageKey, JSON.stringify(fees))
}

export function useFees() {
  const [fees, setFees] = useState<Fee[]>(loadFees)

  useEffect(() => saveFees(fees), [fees])

  function addFee(fee: Fee) {
    const existing = fees.find((f) => f.from === fee.from && f.to === fee.to)
    if (!existing) {
      setFees((prev) => [...prev, fee])
    }
  }

  function updateFee(index: number, fee: Fee) {
    setFees((prev) => prev.map((prevFee, i) => (i === index ? fee : prevFee)))
  }

  function removeFee(index: number) {
    setFees((prev) => prev.filter((_, i) => i !== index))
  }

  return { fees, addFee, updateFee, removeFee }
}
