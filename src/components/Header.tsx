import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LoginButton } from './button/Log-in-outButton'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className='sticky top-0 bg-green-700 shadow-md z-50'>
      <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
        <img src='/OSIS.png' alt='Logo' className='h-10 w-10' />
        <h1 className='text-lg font-bold text-white'>OSIS MA NURUL HUDA</h1>
        <div className='flex items-center space-x-4'>
          {/* Tombol Login */}
          <LoginButton />
          {/* Menu Burger */}
          <div className='relative hover:cursor-pointer'>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className='text-white focus:outline-none'
            >
              <div className='space-y-1 transform transition-all duration-300'>
                <span
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                    menuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
                    menuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                    menuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                ></span>
              </div>
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg transition-all duration-300 ${
                menuOpen
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              <ul className='py-2'>
                <li>
                  <Link
                    to='/'
                    className='block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-500'
                  >
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link
                    to='/members'
                    className='block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-500'
                  >
                    Anggota
                  </Link>
                </li>
                <li>
                  <Link
                    to='/suggestion'
                    className='block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-500'
                  >
                    Kotak saran
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
