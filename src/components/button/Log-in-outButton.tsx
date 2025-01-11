import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export const LoginButton = () => {
  const location = useLocation() // Mendapatkan path saat ini
  const navigate = useNavigate()

  // Menyembunyikan tombol jika berada di "/login"
  if (location.pathname === '/login') {
    return null
  }

  const isDashboard = location.pathname === '/dashboard'

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut() // Logout dari Supabase
      navigate('/login') // Arahkan ke halaman lain setelah logout
    } catch (error) {
      console.error('Gagal logout:', error)
    }
  }

  return (
    <button
      className='bg-white text-gray-600 text-sm font-medium py-2 px-4 rounded-full hover:bg-gray-100 focus:outline-none'
      onClick={isDashboard ? handleLogout : () => navigate('/login')}
    >
      {isDashboard ? 'Logout' : 'Login'}
    </button>
  )
}
