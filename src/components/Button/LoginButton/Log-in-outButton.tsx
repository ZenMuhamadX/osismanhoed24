import { useLocation, useNavigate } from 'react-router-dom'
import { LogIn, LogOut, Loader2 } from 'lucide-react'
import { useToast } from '../../../hooks/useToast'
import { useLogout } from '../../../hooks/adminPages/useLogout'

export const Login_out_Button = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { showToast, toastMessage, toastType, show, hide } = useToast() // Gunakan hook Toast
  const { isLoading, handleLogout } = useLogout() // Gunakan hook Logout

  // Hide on login page
  if (location.pathname === '/login') {
    return null
  }

  const isDashboard = location.pathname.startsWith('/dashboard')

  const handleClick = async () => {
    try {
      if (isDashboard) {
        await handleLogout()
      } else {
        navigate('/login')
      }
    } catch (error) {
      if (error instanceof Error) {
        show(error!.message, 'error') // Tampilkan toast dengan pesan error
      }
      throw error
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`
        group relative 
        inline-flex items-center gap-2
        px-4 py-2 rounded-full
        font-medium text-sm
        transform transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
        ${isLoading ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : isDashboard ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-white text-green-700 hover:bg-green-50'}
        before:absolute before:inset-0 before:rounded-full before:bg-white/0
        before:transition-all before:duration-200
        hover:before:bg-white/10
      `}
    >
      {isLoading ? (
        <>
          <Loader2 className='w-4 h-4 animate-spin' />
          <span>Please wait...</span>
        </>
      ) : isDashboard ? (
        <>
          <LogOut className='w-4 h-4' />
          <span>Logout</span>
        </>
      ) : (
        <>
          <LogIn className='w-4 h-4' />
          <span>Login</span>
        </>
      )}

      {/* Hover effect overlay */}
      <span className='absolute inset-0 rounded-full bg-white/0 transition-all duration-200 group-hover:bg-black/5' />
      {showToast && (
        <Toast message={toastMessage} type={toastType} onClose={hide} />
      )}
    </button>
  )
}

// Optional: Add Toast component for notifications
type ToastProps = {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  return (
    <div
      className={`
        fixed bottom-4 right-4 
        flex items-center gap-2 
        px-4 py-2 rounded-lg shadow-lg
        transform transition-all duration-300
        ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} 
        text-white
      `}
    >
      {type === 'success' ? '✓' : '✕'}
      {message}
      <button onClick={onClose} className='ml-2 hover:opacity-80'>
        ×
      </button>
    </div>
  )
}
