import { useFeesContext } from './FeesContext.tsx'
import { FeeRow } from './FeeRow.tsx'

export default function FeesTable() {
  const { fees } = useFeesContext()

  return (
    <table className='table table-zebra'>
      <thead>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Fee</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {fees.map((_, index) => (
          <FeeRow key={index} index={index} />
        ))}
        {!fees.length && (
          <tr>
            <td colSpan={4} className='text-center text-base-content/50'>
              No fees configured. Default fee of 1% applies.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
