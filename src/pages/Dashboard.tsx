import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { User } from '@supabase/supabase-js'
import { MemberList } from '../components/admin/MemberList'
import { ProgramList } from '../components/admin/ProgramList'
import { Header } from '../components/admin/Header'
import { SuggestionList } from '../components/admin/SuggestionList'

export const Dashboard = () => {
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

  return (
    <div className=''>
      {user ? (
        <div>
          <Header role={user.user_metadata.display_name} />
          <main className='p-6'>
            <MemberList />
            <ProgramList />
            <SuggestionList />
          </main>
        </div>
      ) : (
        <h1>loading...</h1>
      )}
    </div>
  )
}
