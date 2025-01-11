import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export const Dashboard = () => {
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        setUser(data.session.user)
      } else {
        navigate('/login')
      }
    }
    checkSession()
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user)
      } else {
        navigate('/login')
      }
    })
    return () => {
      data.subscription.unsubscribe()
    }
  }, [navigate])
  return (
    <div className='p-6'>
      {user ? (
        <div>
          <h1 className='text-2xl font-bold'>Welcome {user.email}</h1>
          <p>You are logged in</p>
        </div>
      ) : (
        <h1>loading...</h1>
      )}
    </div>
  )
}
