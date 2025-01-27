import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      await supabase.auth.signOut({
        scope: 'global',
      })
      navigate('/login')
    } catch (error) {
      console.error('Gagal logout:', error)
      throw new Error('Gagal logout. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    handleLogout,
  }
}
