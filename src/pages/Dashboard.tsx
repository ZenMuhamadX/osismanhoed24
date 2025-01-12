import { Header } from '../components/admin/Header'
import {
  Users,
  ClipboardList,
  MessageSquare,
  LayoutDashboard,
  Loader2,
} from 'lucide-react'
import { checkSession } from '../lib/checkSession'
import { Link, useLocation } from 'react-router-dom'

// Menu item type
interface MenuItem {
  title: string
  path: string
  icon: React.ReactNode
  description: string
}

export const Dashboard = () => {
  const { user } = checkSession()
  const location = useLocation()

  // Define menu items
  const menuItems: MenuItem[] = [
    {
      title: 'Overview',
      path: '/dashboard',
      icon: <LayoutDashboard className='w-6 h-6' />,
      description: 'Tampilan ringkasan seluruh data',
    },
    {
      title: 'Anggota',
      path: '/dashboard/members',
      icon: <Users className='w-6 h-6' />,
      description: 'Kelola data anggota OSIS',
    },
    {
      title: 'Program Kerja',
      path: '/dashboard/programs',
      icon: <ClipboardList className='w-6 h-6' />,
      description: 'Kelola program kerja OSIS',
    },
    {
      title: 'Kotak Saran',
      path: '/dashboard/suggestions',
      icon: <MessageSquare className='w-6 h-6' />,
      description: 'Lihat saran dari siswa',
    },
  ]

  if (!user) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='flex flex-col items-center gap-2 text-green-700'>
          <Loader2 className='w-8 h-8 animate-spin' />
          <p className='text-sm font-medium'>Loading...</p>
        </div>
      </div>
    )
  }

  const isExactPath = location.pathname === '/dashboard'

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header role={user.user_metadata.display_name} />

      <main className='container mx-auto px-4 py-8'>
        {isExactPath ? (
          // Dashboard Home/Overview
          <div className='space-y-6'>
            <h2 className='text-2xl font-bold text-gray-800'>
              Selamat Datang {user.user_metadata.display_name}
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {menuItems.slice(1).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className='block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group'
                >
                  <div className='flex items-center gap-4'>
                    <div className='p-3 rounded-lg bg-green-50 text-green-600 group-hover:bg-green-100 transition-colors'>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className='text-lg font-semibold text-gray-800'>
                        {item.title}
                      </h3>
                      <p className='text-sm text-gray-500'>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <p className='text-center'>
              fitur2 na gs waras dipake tapi acan beres 100% masih tahap
              development keneh ke sesa fitur2 na nyusul (zuzan)
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </div>
  )
}
