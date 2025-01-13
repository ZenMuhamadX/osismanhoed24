import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../../../lib/supabase'
import { LogIn, LogOut, Loader2 } from 'lucide-react'
import { useState } from 'react'

export const Login_out_Button = () => {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')

  const location = useLocation()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  // Hide on login page
  if (location.pathname === '/login') {
    return null
  }

  const isDashboard = location.pathname.startsWith('/dashboard')

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      await supabase.auth.signOut({
        scope: 'global',
      })
      navigate('/login')
    } catch (error) {
      console.error('Gagal logout:', error)
      setToastMessage('Gagal logout. Silakan coba lagi.')
      setToastType('error')
      setShowToast(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClick = () => {
    if (isDashboard) {
      handleLogout()
    } else {
      navigate('/login')
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
        ${
          isLoading
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : isDashboard
              ? 'bg-red-50 text-red-600 hover:bg-red-100'
              : 'bg-white text-green-700 hover:bg-green-50'
        }
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
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
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
