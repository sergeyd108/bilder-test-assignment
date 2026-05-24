interface Props {
  value?: number
  onChange?: (value?: number) => void
}

export default function FeeInput({ value, onChange }: Props) {
  return (
    <input
      type='number'
      value={value ?? ''}
      min={0}
      max={1}
      step={0.01}
      className='input input-bordered input-xs w-24'
      onKeyDown={(e) => {
        if (e.key === '-') e.preventDefault()
      }}
      onChange={(e) => {
        const value = e.target.value ? +e.target.value : undefined
        onChange?.(value !== undefined && value < 0 ? undefined : value)
      }}
    />
  )
}
