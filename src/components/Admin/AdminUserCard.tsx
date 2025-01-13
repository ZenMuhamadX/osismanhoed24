import { FC } from 'react'
import { User, Briefcase, Trash2 } from 'lucide-react' // Import icon dari Lucide React
import { IoFemale, IoMale } from 'react-icons/io5'

interface UserCardProps {
  name: string
  role: string
  gender: 'male' | 'female' // Gender sebagai props
  onDelete: () => Promise<void> // Fungsi untuk delete user
}

export const AdminUserCard: FC<UserCardProps> = ({
  name,
  role,
  gender,
  onDelete,
}) => {
  const genderIcon =
    gender === 'male' ? (
      <IoMale className='w-4 h-4 text-blue-500' />
    ) : (
      <IoFemale className='w-4 h-4 text-pink-500' />
    )

  return (
    <div className='bg-white rounded-lg shadow-lg p-6 flex items-center justify-between space-x-4 border border-gray-200 hover:shadow-xl transition-shadow duration-200'>
      {/* Kiri: Informasi User */}
      <div className='flex items-center space-x-4'>
        {/* Ikon User */}
        <div className='p-3 bg-gray-100 rounded-full'>
          <User className='w-6 h-6 text-gray-700' />
        </div>
        {/* Informasi */}
        <div>
          <h3 className='text-xl font-semibold text-gray-800'>{name}</h3>
          <div className='flex items-center space-x-2 mt-1 text-gray-600'>
            <Briefcase className='w-4 h-4' />
            <p className='text-sm'>{role}</p>
          </div>
          <div className='flex items-center space-x-2 mt-1 text-gray-600'>
            {genderIcon}
            <p className='text-sm capitalize'>{gender}</p>
          </div>
        </div>
      </div>
      {/* Kanan: Tombol Delete */}
      <button
        onClick={onDelete}
        className='p-2 bg-red-100 hover:bg-red-200 rounded-full transition-colors duration-150'
        aria-label='Delete user'
      >
        <Trash2 className='w-5 h-5 text-red-500' />
      </button>
    </div>
  )
}
