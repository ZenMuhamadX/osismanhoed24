import { BackPrevRoute } from '../../components/Button/BackButton/BackPrevRoute'
import { useUserData } from '../../hooks/useUserData'
import { checkSession } from '../../lib/checkSession'
import { User, UserCheck, Mail, Shield, Clock, Key } from 'lucide-react'

export const AdminLastLogin = () => {
  checkSession()
  const { userData, loading, error } = useUserData()

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white'>
        <div className='w-12 h-12 border-4 border-t-transparent border-green-600 rounded-full animate-spin'></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white'>
        <div className='bg-red-50 p-4 rounded-xl shadow-sm max-w-md w-full'>
          <p className='text-red-600 font-medium text-center'>Error: {error}</p>
        </div>
        <div className='mt-4'>
          <BackPrevRoute />
        </div>
      </div>
    )
  }

  const userDetails = [
    {
      icon: Key,
      label: 'ID',
      value: userData?.data.user?.id,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: User,
      label: 'Nama',
      value: userData?.data.user?.user_metadata.display_name,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Mail,
      label: 'Email',
      value: userData?.data.user?.email,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
    },
    {
      icon: Shield,
      label: 'Role',
      value: userData?.data.user?.user_metadata.role,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      icon: UserCheck,
      label: 'Display name',
      value: userData?.data.user?.user_metadata.display_name,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Clock,
      label: 'Terakhir Login',
      value: new Date(
        userData?.data.user?.last_sign_in_at || '',
      ).toLocaleString(),
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ]

  return (
    <div className='min-h-screen bg-gradient-to-b from-green-50 to-white py-8 px-4'>
      <div className='container mx-auto max-w-2xl'>
        <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
          {/* Header */}
          <div className='bg-gradient-to-r from-green-600 to-green-700 px-6 py-8'>
            <div className='flex items-center space-x-4'>
              <div className='bg-white/10 p-3 rounded-xl'>
                <User className='w-8 h-8 text-white' />
              </div>
              <div>
                <h1 className='text-2xl font-bold text-white'>
                  Detail User {userData?.data.user?.user_metadata.display_name}
                </h1>
                <p className='text-green-100 mt-1'>
                  Informasi lengkap pengguna
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className='p-6'>
            <div className='grid gap-6 md:grid-cols-2'>
              {userDetails.map((detail) => (
                <div
                  key={detail.label}
                  className='bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all duration-300'
                >
                  <div className='flex items-start space-x-4'>
                    <div className={`${detail.bgColor} p-2 rounded-lg`}>
                      <detail.icon className={`w-5 h-5 ${detail.color}`} />
                    </div>
                    <div className='flex-1'>
                      <h2 className={`font-medium ${detail.color}`}>
                        {detail.label}
                      </h2>
                      <p className='text-gray-700 mt-1 break-all'>
                        {detail.value || '-'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info Card */}
            <div className='mt-6 bg-gray-50 rounded-xl p-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                  <span className='text-sm text-gray-600'>Status Akun</span>
                </div>
                <span className='px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full'>
                  Aktif
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className='px-6 py-4 bg-gray-50 border-t border-gray-100'>
            <div className='flex justify-end'>
              <BackPrevRoute />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
