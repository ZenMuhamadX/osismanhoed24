import React from 'react'
import { User, ChevronRight, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { BackToDashboardButton } from '../../components/Button/BackButton/BackPrevRoute'
import { useUserData } from '../../hooks/useUserData'
import { menuItems } from './menuItems'
import { getAvatars } from '../../lib/getAvatars'
import { checkSession } from '../../lib/checkSession'

export const AdminAccountManage: React.FC = () => {
  checkSession()
  const navigate = useNavigate()
  const { userData, loading, error } = useUserData()
  const avatarUrl = getAvatars(userData?.data.user?.user_metadata.avatar_id)

  const getMenuStyle = (index: number) => {
    const styles = [
      {
        icon: 'bg-purple-50 text-purple-600',
        hover: 'hover:bg-purple-50 hover:border-purple-200',
      },
      {
        icon: 'bg-rose-50 text-rose-600',
        hover: 'hover:bg-rose-50 hover:border-rose-200',
      },
      {
        icon: 'bg-amber-50 text-amber-600',
        hover: 'hover:bg-amber-50 hover:border-amber-200',
      },
      {
        icon: 'bg-blue-50 text-blue-600',
        hover: 'hover:bg-blue-50 hover:border-blue-200',
      },
    ]
    return styles[index] || styles[0]
  }

  const renderMenuItem = (item: any, index: number) => {
    const ItemIcon = item.icon
    const style = getMenuStyle(index)

    return (
      <div
        key={item.title}
        onClick={() => navigate(item.route)}
        className={`flex items-center justify-between p-4 bg-white ${style.hover} rounded-xl shadow-sm transition-all duration-300 cursor-pointer border border-transparent`}
      >
        <div className='flex items-center space-x-4'>
          <div className={`${style.icon} p-2.5 rounded-xl`}>
            <ItemIcon className='w-5 h-5' />
          </div>
          <div>
            <h3 className='text-gray-800 font-semibold text-sm md:text-base'>
              {item.title}
            </h3>
            <p className='text-gray-500 text-xs md:text-sm'>
              {item.description}
            </p>
          </div>
        </div>
        <ChevronRight className={`${style.icon.split(' ')[1]} w-5 h-5`} />
      </div>
    )
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white'>
        <div className='w-12 h-12 border-4 border-t-transparent border-green-600 rounded-full animate-spin'></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white space-y-4'>
        <div className='bg-red-50 p-4 rounded-xl'>
          <p className='text-red-600 font-medium text-center'>{error}</p>
        </div>
        <BackToDashboardButton />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-green-50 to-white py-6 px-4'>
      <div className='container mx-auto max-w-lg'>
        {/* Enhanced Header Profile */}
        <div className='bg-white rounded-2xl shadow-lg p-6 mb-8'>
          <div className='flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6'>
            <div className='relative group'>
              {avatarUrl ? (
                <img
                  src={avatarUrl.data.publicUrl}
                  alt='Profile'
                  className='w-20 h-20 rounded-2xl object-cover border-2 border-gray-200 group-hover:border-purple-400 transition-all duration-300'
                />
              ) : (
                <div className='w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:from-purple-600 group-hover:to-blue-700 transition-all duration-300'>
                  <User className='w-10 h-10 text-white' />
                </div>
              )}
              <div className='absolute -bottom-2 -right-2 bg-purple-100 p-1.5 rounded-full border-2 border-white shadow-md'>
                <Settings className='w-4 h-4 text-purple-600' />
              </div>
            </div>
            <div className='text-center md:text-left'>
              <h2 className='text-xl md:text-2xl font-bold text-gray-800'>
                {userData?.data.user?.user_metadata.display_name || 'Pengguna'}
              </h2>
              <p className='text-green-600 text-sm md:text-base'>
                Kelola akun Anda
              </p>
              <div className='mt-2 inline-block px-3 py-1 bg-gradient-to-r from-purple-50 to-blue-50 rounded-full'>
                <p className='text-purple-600 text-xs font-medium'>
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Settings with Original MenuItems */}
        <div className='space-y-3 mb-8'>
          {menuItems.map((item, index) => renderMenuItem(item, index))}
        </div>

        {/* Enhanced Back Button */}
        <div className='flex items-center justify-center'>
          <BackToDashboardButton />
        </div>
      </div>
    </div>
  )
}
