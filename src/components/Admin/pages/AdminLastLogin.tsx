import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { UserResponse } from '@supabase/supabase-js'
import { BackToDashboardButton } from '../../Button/BackButton/backToDashboard'

export const AdminLastLogin = () => {
  const [user, setUser] = useState<UserResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      setError(null)

      try {
        // Fetch data user dari Supabase
        const data = await supabase.auth.getUser()

        if (error) throw error
        setUser(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (loading) {
    return (
      <div className='min-h-screen flex justify-center items-center bg-gray-50'>
        <p className='text-green-700'>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen flex justify-center items-center bg-gray-50'>
        <p className='text-red-500'>Error: {error}</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6'>
      <div className='bg-white shadow-lg rounded-lg w-full max-w-md'>
        <div className='bg-green-700 text-white p-4 rounded-t-lg'>
          <h1 className='text-2xl font-bold'>
            Detail User {user?.data.user?.user_metadata.display_name}
          </h1>
        </div>
        <div className='p-6 space-y-4'>
          <div>
            <h2 className='text-green-700 font-bold'>ID:</h2>
            <p className='text-gray-700'>{user?.data.user?.id}</p>
          </div>
          <div>
            <h2 className='text-green-700 font-bold'>Nama:</h2>
            <p className='text-gray-700'>
              {user?.data.user?.user_metadata.display_name}
            </p>
          </div>
          <div>
            <h2 className='text-green-700 font-bold'>Email:</h2>
            <p className='text-gray-700'>{user?.data.user?.email}</p>
          </div>
          <div>
            <h2 className='text-green-700 font-bold'>Role:</h2>
            <p className='text-gray-700'>
              {user?.data.user?.user_metadata.role}
            </p>
          </div>
          <div>
            <h2 className='text-green-700 font-bold'>Terakhir Login:</h2>
            <p className='text-gray-700'>
              {new Date(
                user?.data.user?.last_sign_in_at || '',
              ).toLocaleString()}
            </p>
          </div>
        </div>
        <div className='p-4 border-t border-gray-200 flex justify-end'>
          <BackToDashboardButton />
        </div>
      </div>
    </div>
  )
}
