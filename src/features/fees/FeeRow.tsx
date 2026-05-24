import FeeInput from './FeeInput.tsx'
import { useFeesContext } from './FeesContext.tsx'
import { useCurrencyPairs } from './useCurrencyPairs.ts'

export function FeeRow({ index }: { index: number }) {
  const { fees, updateFee, removeFee } = useFeesContext()

  const currentFee = fees[index]
  const otherFees = fees.filter((_, i) => i !== index)

  const { fromCurrencies, toCurrencies } = useCurrencyPairs(currentFee, otherFees)

  function handleFrom(value: string) {
    updateFee(index, { ...currentFee, from: value, to: currentFee.to === value ? '' : currentFee.to })
  }

  function handleTo(value: string) {
    updateFee(index, { ...currentFee, to: value, from: currentFee.from === value ? '' : currentFee.from })
  }

  function handleFee(value?: number) {
    if (value !== undefined) {
      updateFee(index, { ...currentFee, fee: value })
    }
  }

  return (
    <tr>
      <td>
        <select
          className='select select-bordered select-xs w-24'
          value={currentFee.from}
          onChange={(e) => handleFrom(e.target.value)}
        >
          {fromCurrencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </td>
      <td>
        <select
          className='select select-bordered select-xs w-24'
          value={currentFee.to}
          onChange={(e) => handleTo(e.target.value)}
        >
          {toCurrencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </td>
      <td>
        <FeeInput value={currentFee.fee} onChange={handleFee} />
      </td>
      <td>
        <button className='btn btn-ghost btn-xs text-error' onClick={() => removeFee(index)}>
          Remove
        </button>
      </td>
    </tr>
  )
}
