import React, { useState, useEffect } from 'react'
import {
  User,
  Lock,
  ChevronRight,
  // UserSquareIcon,
  TimerIcon,
  UserCogIcon,
  UserSquareIcon,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { UserResponse } from '@supabase/supabase-js'
import { BackToDashboardButton } from '../Button/BackButton/backToDashboard'

interface AccountMenuItem {
  icon: React.ElementType
  title: string
  description: string
  route: string
}

export const AdminAccountManage: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const [userData, setUserData] = useState<UserResponse | null>(null)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await supabase.auth.getUser()
        if (user) {
          setUserData(user)
        }
      } catch (error) {
        console.error('Error fetching user data', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const menuItems: AccountMenuItem[] = [
    {
      icon: Lock,
      title: 'Ganti Password',
      description: 'Ubah kata sandi akun Anda',
      route: '/dashboard/account/change_password',
    },
    {
      icon: UserCogIcon,
      title: 'Ganti display name',
      description: 'Ubah display name anda',
      route: '/dashboard/account/change_display_name',
    },
    {
      icon: UserSquareIcon,
      title: 'Avatar',
      description: 'Ubah avatar anda',
      route: '/dashboard/account/avatars',
    },
    {
      icon: TimerIcon,
      title: 'Terakhir login',
      description: 'Lihat waktu terakhir login Anda',
      route: '/dashboard/account/last_login',
    },
  ]

  const renderMenuItem = (item: AccountMenuItem) => {
    const ItemIcon = item.icon
    return (
      <div
        key={item.title}
        onClick={() => navigate(item.route)}
        className='flex items-center justify-between p-4 bg-white hover:bg-green-50 rounded-lg shadow-sm transition-all duration-300 cursor-pointer'
      >
        <div className='flex items-center space-x-4'>
          <div className='bg-gray-50 p-2 rounded-full'>
            <ItemIcon className='text-green-700 w-6 h-6' />
          </div>
          <div>
            <h3 className='text-green-800 font-semibold'>{item.title}</h3>
            <p className='text-green-600 text-sm'>{item.description}</p>
          </div>
        </div>
        <ChevronRight className='text-green-500' />
      </div>
    )
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-green-50'>
        <div className='w-16 h-16 border-4 border-t-transparent border-green-600 rounded-full animate-spin'></div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <div className='container mx-auto max-w-md'>
        {/* Header Profil */}
        <div className='bg-white rounded-xl shadow-md p-6 mb-6 flex items-center space-x-4'>
          <div className='w-16 h-16 bg-green-600 rounded-full flex items-center justify-center'>
            <User className='w-10 h-10 text-white' />
          </div>
          <div>
            <h2 className='text-xl font-bold text-green-800'>
              {userData?.data.user?.user_metadata.display_name || 'Pengguna'}
            </h2>
            <p className='text-green-600'>Kelola akun Anda</p>
          </div>
        </div>

        {/* Menu Pengaturan */}
        <div className='space-y-4 mb-6'>{menuItems.map(renderMenuItem)}</div>
        <div className='flex items-center justify-center'>
          <BackToDashboardButton />
        </div>
      </div>
    </div>
  )
}
