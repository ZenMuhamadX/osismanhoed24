import { FC } from 'react'
import { LayoutDashboard, User, ChevronRight } from 'lucide-react'

interface HeaderProps {
  role: string
}

export const AdminHeader: FC<HeaderProps> = ({ role }) => {
  return (
    <header className='relative overflow-hidden'>
      {/* Background with gradient */}
      <div className='absolute inset-0 bg-gradient-to-r from-green-700 to-green-500'>
        {/* Optional: Subtle pattern overlay */}
        <div
          className='absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)]'
          style={{ backgroundSize: '24px 24px' }}
        />
      </div>

      {/* Content container */}
      <div className='relative px-6 py-6 sm:px-8'>
        <div className='max-w-7xl mx-auto'>
          {/* Main content */}
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
            {/* Title section */}
            <div className='flex items-center space-x-3'>
              <LayoutDashboard className='w-7 h-7 text-white' />
              <div>
                <h1 className='text-2xl font-bold text-white tracking-tight'>
                  Dashboard OSIS
                </h1>
                <div className='flex items-center mt-1 text-green-100 text-sm space-x-2'>
                  <User className='w-4 h-4' />
                  <span>Login sebagai</span>
                  <ChevronRight className='w-4 h-4' />
                  <span className='font-semibold bg-white/20 px-2 py-0.5 rounded-full'>
                    {role}
                  </span>
                </div>
              </div>
            </div>

            {/* Optional: You could add navigation or action buttons here */}
            <div className='hidden sm:flex items-center space-x-4 mt-4 sm:mt-0'>
              {/* Add any additional header content here */}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className='h-1 bg-gradient-to-r from-green-600/50 via-white/25 to-green-600/50' />
    </header>
  )
}
