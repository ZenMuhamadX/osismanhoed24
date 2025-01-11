import { FC } from 'react'

interface UserCardProps {
  name: string
  role: string
}

export const UserCard: FC<UserCardProps> = ({ name, role }) => {
  return (
    <div className='bg-white rounded-lg shadow-md p-4'>
      <h3 className='text-lg font-bold'>{name}</h3>
      <p className='text-sm text-gray-600'>{role}</p>
    </div>
  )
}
