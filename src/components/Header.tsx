import { Link } from 'react-router-dom'
import { Login_out_Button } from './Button/LoginButton/Log-in-outButton'
import {
  Users,
  MessageSquare,
  Menu,
  X,
  LayoutDashboardIcon,
  Home,
} from 'lucide-react'
import { useMenuToggle } from '../hooks/useMenuToogle'

export const Header = () => {
  const [menuOpen, setMenuOpen] = useMenuToggle(false)

  return (
    <header className='sticky top-0 z-50'>
      {/* Backdrop blur effect */}
      <div className='absolute inset-0 bg-green-700 bg-opacity-95 backdrop-blur-sm' />
      {/* Main content */}
      <div className='relative'>
        <div className='container mx-auto px-4 py-3'>
          <div className='flex items-center justify-between gap-4'>
            {/* Logo Section */}
            <div className='flex items-center space-x-3 shrink-0'>
              <div className='relative group'>
                <img
                  src='/OSIS.png'
                  alt='Logo'
                  className='h-12 w-12 rounded-lg transform transition-transform duration-300 group-hover:scale-105'
                />
                <div className='absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300' />
              </div>
            </div>

            {/* Title - Now in its own container */}
            <div className='flex-1 text-center sm:text-left'>
              <h1 className='text-lg sm:text-xl font-bold text-white tracking-tight truncate'>
                OSIS MA NURUL HUDA
              </h1>
              <div className='hidden sm:block h-0.5 w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30' />
            </div>

            {/* Actions Section with better spacing */}
            <div className='flex items-center gap-3 sm:gap-4 shrink-0'>
              <Login_out_Button />

              {/* Menu Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setMenuOpen(!menuOpen)
                }}
                className='relative p-1 rounded-lg hover:bg-white/10 transition-colors duration-200 focus:outline-none'
                aria-label='Menu'
              >
                {menuOpen ? (
                  <X className='w-6 h-6 text-white' />
                ) : (
                  <Menu className='w-6 h-6 text-white' />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown Menu */}
        <div
          className={`
            absolute right-4 top-full mt-2 w-56 rounded-xl 
            bg-white shadow-lg ring-1 ring-black ring-opacity-5 
            transform transition-all duration-200 ease-out
            ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
          `}
        >
          <div className='py-2 divide-y divide-gray-100'>
            <Link
              to='/'
              className='group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-green-50 transition-colors duration-150'
            >
              <Home className='w-4 h-4 mr-3 text-gray-400 group-hover:text-green-600' />
              <span className='group-hover:text-green-700'>Beranda</span>
            </Link>

            <Link
              to='/members'
              className='group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-green-50 transition-colors duration-150'
            >
              <Users className='w-4 h-4 mr-3 text-gray-400 group-hover:text-green-600' />
              <span className='group-hover:text-green-700'>Anggota</span>
            </Link>

            <Link
              to='/suggestion'
              className='group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-green-50 transition-colors duration-150'
            >
              <MessageSquare className='w-4 h-4 mr-3 text-gray-400 group-hover:text-green-600' />
              <span className='group-hover:text-green-700'>Kotak Saran</span>
            </Link>

            <Link
              to='/dashboard'
              className='group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-green-50 transition-colors duration-150'
            >
              <LayoutDashboardIcon className='w-4 h-4 mr-3 text-gray-400 group-hover:text-green-600' />
              <span className='group-hover:text-green-700'>Dashboard</span>
            </Link>
          </div>

          {/* Decorative bottom border */}
          <div className='h-1 w-full bg-gradient-to-r from-green-700 to-green-500 rounded-b-xl' />
        </div>
      </div>
      {/* Bottom border with gradient */}
      <div className='relative h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent' />
    </header>
  )
}
