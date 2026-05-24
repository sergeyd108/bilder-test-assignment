import type { ReactNode } from 'react'

export function FormField({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <div className={`flex flex-col gap-0.5${className ? ` ${className}` : ''}`}>
      <label className='label'>
        <span className='label-text'>{label}</span>
      </label>
      {children}
    </div>
  )
}
