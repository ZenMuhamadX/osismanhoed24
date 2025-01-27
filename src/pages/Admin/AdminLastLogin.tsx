import { BackToDashboardButton } from '../../components/Button/BackButton/backToDashboard'
import { useUserData } from '../../hooks/useUserData'
import { checkSession } from '../../lib/checkSession'

export const AdminLastLogin = () => {
  checkSession()
  const { userData, loading, error } = useUserData()

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
            Detail User {userData?.data.user?.user_metadata.display_name}
          </h1>
        </div>
        <div className='p-6 space-y-4'>
          <div>
            <h2 className='text-green-700 font-bold'>ID:</h2>
            <p className='text-gray-700'>{userData?.data.user?.id}</p>
          </div>
          <div>
            <h2 className='text-green-700 font-bold'>Nama:</h2>
            <p className='text-gray-700'>
              {userData?.data.user?.user_metadata.display_name}
            </p>
          </div>
          <div>
            <h2 className='text-green-700 font-bold'>Email:</h2>
            <p className='text-gray-700'>{userData?.data.user?.email}</p>
          </div>
          <div>
            <h2 className='text-green-700 font-bold'>Role:</h2>
            <p className='text-gray-700'>
              {userData?.data.user?.user_metadata.role}
            </p>
          </div>
          <div>
            <h2 className='text-green-700 font-bold'>Terakhir Login:</h2>
            <p className='text-gray-700'>
              {new Date(
                userData?.data.user?.last_sign_in_at || '',
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
