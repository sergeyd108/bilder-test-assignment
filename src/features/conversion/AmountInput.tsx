import { FormField } from '@/components/FormField.tsx'

interface Props {
  amount?: number
  className?: string
  onChange?: (amount?: number) => void
}

export default function AmountInput({ amount, onChange, className }: Props) {
  return (
    <FormField label='Amount' className={className}>
      <input
        type='number'
        value={amount ?? ''}
        min={0}
        step={1}
        placeholder='1000'
        className='input input-bordered'
        onKeyDown={(e) => {
          if (e.key === '-') e.preventDefault()
        }}
        onChange={(e) => {
          const value = e.target.value ? +e.target.value : undefined
          onChange?.(value !== undefined && value < 0 ? undefined : value)
        }}
      />
    </FormField>
  )
}
