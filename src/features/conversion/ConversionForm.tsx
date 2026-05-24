import { useState } from 'react'
import { defaultFromCurrency, defaultToCurrency } from '@/constants'
import { useRatesContext } from '@/features/rates'
import { useConversion } from './useConversion.ts'
import { ConversionResultCard } from './ConversionResultCard.tsx'
import CurrencyPairSelect from './CurrencyPairSelect.tsx'
import AmountInput from './AmountInput.tsx'

export default function ConversionForm() {
  const { error } = useRatesContext()

  const [amount, setAmount] = useState<number>()
  const [from, setFrom] = useState(defaultFromCurrency)
  const [to, setTo] = useState(defaultToCurrency)

  const result = useConversion(from, to, amount)

  return (
    <div className='card card-body bg-base-100 shadow pt-4'>
      {error && <div className='alert alert-error'>{error}</div>}

      <div className='flex gap-2'>
        <AmountInput amount={amount} className='flex-1' onChange={setAmount} />
        <CurrencyPairSelect from={from} to={to} className='flex-1' onChangeFrom={setFrom} onChangeTo={setTo} />
      </div>

      {!!result.result && <ConversionResultCard result={result} className='mt-4' />}
    </div>
  )
}
