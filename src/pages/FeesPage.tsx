import { FeesTable, AddFeeForm } from '@/features/fees'

export default function FeesPage() {
  return (
    <div className='card card-body bg-base-100 shadow'>
      <h2 className='card-title'>Conversion Fees</h2>
      <FeesTable />
      <div className='divider'>Add new fee</div>
      <AddFeeForm />
    </div>
  )
}
