import React from 'react'

interface CardProps {
  photo: string // URL foto
  name: string
  position: string
  motto: string
}

const Card: React.FC<CardProps> = ({ photo, name, position, motto }) => {
  return (
    <div className='max-w-sm bg-white shadow-lg rounded-lg overflow-hidden border'>
      {/* Bagian Foto */}
      <img src={photo} alt={name} className='w-full h-48 object-cover' />

      {/* Bagian Informasi */}
      <div className='p-4'>
        <h2 className='text-lg font-semibold text-gray-800'>{name}</h2>
        <p className='text-sm text-gray-600'>{position}</p>
        <hr className='my-2' />
        <p className='text-gray-700 italic'>"{motto}"</p>
      </div>
    </div>
  )
}

export default Card
