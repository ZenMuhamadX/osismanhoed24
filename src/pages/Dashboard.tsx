import React, { useEffect, useState } from 'react'
import {
  Users,
  ClipboardList,
  MessageSquare,
  LayoutDashboard,
  Loader2,
  UserCircleIcon,
  ArrowRight,
  ImageIcon,
  BadgeCheck,
} from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AdminHeader } from '../components/Admin/AdminHeader'
import { getAvatars } from '../lib/getAvatars'
import { checkSession } from '../lib/checkSession'
// Menu item type
interface MenuItem {
  title: string
  path: string
  icon: React.ReactNode
  description: string
  bgColor: string
  textColor: string
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const { user } = checkSession()
  const location = useLocation()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [avatarError, setAvatarError] = useState(false)

  // Generate avatar placeholder based on name
  const getAvatarPlaceholder = (name: string) => {
    // Extract initials
    const initials = name
      .split(' ')
      .map((word) => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()

    return (
      <div className='w-32 h-32 rounded-full bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center text-4xl font-bold text-white shadow-lg'>
        {initials}
      </div>
    )
  }

  // Fetch avatar URL from Supabase Storage
  useEffect(() => {
    const fetchAvatar = async () => {
      if (user) {
        try {
          // Check if avatar_id exists
          const avatarId = user?.user_metadata.avatar_id

          if (!avatarId) {
            setAvatarError(true)
            setIsLoading(false)
            return
          }

          // Attempt to get public URL
          const { data } = getAvatars(avatarId)

          if (!data.publicUrl) {
            throw new Error('No public URL found')
          }

          setAvatarUrl(data.publicUrl)
        } catch (err) {
          console.error('Error fetching avatar:', err)
          setAvatarError(true)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchAvatar()
  }, [user])

  const menuItems: MenuItem[] = [
    {
      title: 'Overview',
      path: '/dashboard',
      icon: <LayoutDashboard className='w-6 h-6' />,
      description: 'Tampilan ringkasan seluruh data',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Anggota',
      path: '/dashboard/members',
      icon: <Users className='w-6 h-6' />,
      description: 'Kelola data anggota OSIS',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Program Kerja',
      path: '/dashboard/programs',
      icon: <ClipboardList className='w-6 h-6' />,
      description: 'Kelola program kerja OSIS',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      title: 'Kotak Saran',
      path: '/dashboard/suggestions',
      icon: <MessageSquare className='w-6 h-6' />,
      description: 'Lihat saran dari siswa',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      title: 'Akun',
      path: '/dashboard/account',
      icon: <UserCircleIcon className='w-6 h-6' />,
      description: 'Kelola akun anda',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
    },
  ]

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-green-700 to-green-500'>
        <div className='flex flex-col items-center gap-4 text-white'>
          <Loader2 className='w-12 h-12 animate-spin' />
          <p className='text-lg font-medium'>Memuat Dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    navigate('/login') // Or redirect logic
  }

  const isExactPath = location.pathname === '/dashboard'

  return (
    <div className='min-h-screen bg-gradient-to-r from-green-700 to-green-500'>
      <AdminHeader role={user?.user_metadata.display_name} />

      <main className='container mx-auto px-4 py-8'>
        {isExactPath && (
          <div className='space-y-8'>
            {/* Enhanced Avatar and Welcome Section */}
            <div className='text-center space-y-6'>
              <div className='flex justify-center relative'>
                {avatarUrl && !avatarError ? (
                  <div className='relative'>
                    <img
                      src={avatarUrl}
                      alt='User Avatar'
                      className='w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover'
                      onError={() => setAvatarError(true)}
                    />
                    <BadgeCheck
                      className='absolute bottom-2 right-2 text-green-500 bg-white rounded-full'
                      size={28}
                    />
                  </div>
                ) : (
                  <div className='relative'>
                    {getAvatarPlaceholder(user?.user_metadata.display_name)}
                    <div className='absolute bottom-0 right-0 bg-white rounded-full p-1'>
                      <ImageIcon
                        className='text-gray-500'
                        size={24}
                        strokeWidth={2}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className='text-white space-y-2'>
                <h2 className='text-3xl font-bold flex items-center justify-center gap-2'>
                  Selamat Datang, {user?.user_metadata.display_name}
                </h2>
                <p className='text-lg text-green-100 flex items-center justify-center gap-2'>
                  Role: {user?.user_metadata.role}
                </p>
                {avatarError && (
                  <div className='text-sm text-yellow-200 flex items-center justify-center gap-2 mt-2'>
                    <ImageIcon size={16} />
                    Avatar tidak tersedia. Silakan unggah avatar baru.
                  </div>
                )}
              </div>
            </div>

            {/* Menu Grid with Enhanced Design */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {menuItems.slice(1).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className='block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 group'
                >
                  <div className='p-6 flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                      <div
                        className={`p-3 rounded-lg ${item.bgColor} ${item.textColor} group-hover:scale-110 transition-transform`}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <h3 className='text-lg font-bold text-gray-800'>
                          {item.title}
                        </h3>
                        <p className='text-sm text-gray-500'>
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight
                      className='text-gray-400 group-hover:translate-x-1 transition-transform'
                      size={24}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
