// hooks/useAuth.js
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabase'
import { User } from '@supabase/supabase-js'

export const checkSession = () => {
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error
        if (data.session) {
          setUser(data.session.user)
        } else {
          navigate('/login')
        }
      } catch (error) {
        console.error('Error checking session:', error)
        navigate('/login')
      }
    }
    checkSession()

    const { data: subscriptionData } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setUser(session.user)
        } else {
          navigate('/login')
        }
      },
    )

    return () => {
      subscriptionData?.subscription?.unsubscribe()
    }
  }, [navigate])

  return { user }
}
