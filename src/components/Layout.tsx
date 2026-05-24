import { Outlet } from 'react-router'
import Navbar from '@/components/Navbar.tsx'

export default function Layout() {
  return (
    <div className='flex flex-col min-h-screen bg-base-200'>
      <Navbar />
      <main className='flex flex-col justify-center grow container mx-auto p-6 max-w-2xl '>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
