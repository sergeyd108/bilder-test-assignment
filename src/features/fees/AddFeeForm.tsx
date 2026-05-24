import { useState } from 'react'
import { defaultFee, defaultFromCurrency } from '@/constants'
import { FormField } from '@/components/FormField.tsx'
import type { Fee } from './types.ts'
import { useRatesContext } from '@/features/rates'
import { useFeesContext } from './FeesContext.tsx'
import { useCurrencyPairs } from './useCurrencyPairs.ts'

const emptyFee: Fee = { from: defaultFromCurrency, to: '', fee: defaultFee }

export function AddFeeForm() {
  const { fees, addFee } = useFeesContext()
  const { loading } = useRatesContext()

  const [draftFee, setDraftFee] = useState<Fee>(emptyFee)

  const { fromCurrencies, toCurrencies } = useCurrencyPairs(draftFee, fees)

  function handleFrom(value: string) {
    setDraftFee((d) => ({ ...d, from: value, to: d.to === value ? '' : d.to }))
  }

  function handleTo(value: string) {
    setDraftFee((d) => ({ ...d, to: value, from: d.from === value ? '' : d.from }))
  }

  function handleAdd() {
    if (draftFee.from && draftFee.to && draftFee.from !== draftFee.to) {
      addFee(draftFee)
      setDraftFee(emptyFee)
    }
  }

  return (
    <div className='flex gap-2 items-end'>
      <FormField label='From' className='flex-1'>
        <select
          value={draftFee.from}
          disabled={loading}
          className='select select-bordered select-sm'
          onChange={(e) => handleFrom(e.target.value)}
        >
          <option value=''>Select</option>
          {fromCurrencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label='To' className='flex-1'>
        <select
          value={draftFee.to}
          disabled={loading}
          className='select select-bordered select-sm'
          onChange={(e) => handleTo(e.target.value)}
        >
          <option value=''>Select</option>
          {toCurrencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label='Fee (fraction)' className='flex-1'>
        <input
          type='number'
          value={draftFee.fee}
          min={0}
          max={1}
          step={0.01}
          placeholder='0.01'
          className='input input-bordered input-sm'
          onChange={(e) => setDraftFee((d) => ({ ...d, fee: +e.target.value || 0 }))}
        />
      </FormField>

      <button className='btn btn-primary btn-sm' onClick={handleAdd}>
        Add Fee
      </button>
    </div>
  )
}
