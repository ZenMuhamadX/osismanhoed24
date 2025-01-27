import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { UserResponse } from '@supabase/supabase-js'

export const useUserData = () => {
  const [userData, setUserData] = useState<UserResponse | null>(null)
  const [isLogin, setIslogIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await supabase.auth.getUser()
        if (user) {
          setUserData(user)
          setIslogIn(true)
        }
      } catch (error) {
        console.error('Error fetching user data', error)
        setError('Failed to load user data.')
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  return { userData, loading, error, isLogin }
}
