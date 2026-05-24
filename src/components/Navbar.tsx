import { NavLink } from 'react-router'

export default function Navbar() {
  return (
    <nav className='navbar bg-base-100 shadow'>
      <div className='flex-1 text-lg font-bold px-4'>Currency Converter</div>
      <div className='flex gap-2 px-4'>
        <NavLink to='/' className={({ isActive }) => `btn ${isActive ? 'btn-primary' : 'btn-ghost'}`}>
          Convert
        </NavLink>
        <NavLink to='/fees' className={({ isActive }) => `btn ${isActive ? 'btn-primary' : 'btn-ghost'}`}>
          Fees
        </NavLink>
      </div>
    </nav>
  )
}
