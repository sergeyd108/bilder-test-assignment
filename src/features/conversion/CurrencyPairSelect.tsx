import { FormField } from '@/components/FormField.tsx'
import { useRatesContext } from '@/features/rates'

interface Props {
  from?: string
  to?: string
  onChangeFrom?: (value: string) => void
  onChangeTo?: (value: string) => void
  className?: string
}

export default function CurrencyPairSelect({ from, to, onChangeFrom, onChangeTo, className }: Props) {
  const { loading } = useRatesContext()
  const { currencies } = useRatesContext()

  const fromCurrencies = currencies.filter((currency) => currency !== to)
  const toCurrencies = currencies.filter((currency) => currency !== from)

  return (
    <div className={`${className} flex gap-2`}>
      <FormField label='From' className='flex-1'>
        <select
          value={from}
          disabled={loading}
          className='select select-bordered'
          onChange={(e) => onChangeFrom?.(e.target.value)}
        >
          {fromCurrencies.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label='To' className='flex-1'>
        <select
          value={to}
          disabled={loading}
          className='select select-bordered'
          onChange={(e) => onChangeTo?.(e.target.value)}
        >
          {toCurrencies.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </FormField>
    </div>
  )
}
