import type { ConversionResult } from './useConversion.ts'

interface Props {
  result: ConversionResult
  className?: string
}

export function ConversionResultCard({ result, className }: Props) {
  const resultStr = result.result.toFixed(4)
  const rateStr = result.rate.toFixed(6)
  const feePct = (result.fee * 100).toFixed(2)
  const formula = `${result.amount} × (1 - ${result.fee}) × ${rateStr} = ${resultStr}`

  return (
    <div className={`${className} alert alert-info alert-soft`}>
      <div className='flex flex-col gap-1'>
        <p className='text-lg'>
          <strong>Result:</strong> {resultStr} {result.to}
        </p>
        <div className='opacity-80 text-success/80'>
          <p>
            <strong>Fee applied:</strong> {feePct}%
          </p>
          <p>
            <strong>Exchange rate:</strong> 1 {result.from} = {rateStr} {result.to}
          </p>
          <p className='text-xs mt-1'>{formula}</p>
        </div>
      </div>
    </div>
  )
}
