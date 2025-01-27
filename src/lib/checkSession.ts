// hooks/useAuth.js
import { useEffect, useState } from 'react'
import { redirect } from 'react-router-dom'
import { supabase } from './supabase'
import { User } from '@supabase/supabase-js'

export const checkSession = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error
        if (data.session) {
          setUser(data.session.user)
        } else {
          redirect('/login')
        }
      } catch (error) {
        console.error('Error checking session:', error)
        redirect('/login')
      }
    }
    checkSession()

    const { data: subscriptionData } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setUser(session.user)
        } else {
          redirect('/login')
        }
      },
    )

    return () => {
      subscriptionData?.subscription?.unsubscribe()
    }
  }, [redirect])

  return { user }
}
