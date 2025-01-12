import { Quote } from 'lucide-react'

interface CardProps {
  gender: 'male' | 'female'
  name: string
  role: string
  motto: string
}

const Card: React.FC<CardProps> = ({ gender, name, role, motto }) => {
  let photo = gender === 'male' ? 'male.png' : 'female.png'
  if (name === 'HJ JOHAN JOHARIANSYAH SPD') photo = 'Pembina.jpg'

  return (
    <div className='bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300'>
      {/* Photo */}
      <div className='relative h-48 overflow-hidden'>
        <img src={photo} alt={name} className='w-full h-full object-cover' />
        <div className='absolute inset-0 bg-gradient-to-t from-black opacity-30' />
        <div className='absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-transparent to-transparent'>
          <h3 className='font-bold text-lg text-white'>{name}</h3>
          <p className='text-sm text-white opacity-80'>{role}</p>
        </div>
      </div>

      {/* Motto */}
      <div className='p-4'>
        <div className='flex items-start gap-2'>
          <Quote className='h-4 w-4 text-green-600 flex-shrink-0 mt-1' />
          <p className='text-sm text-gray-700 italic'>" {motto} "</p>
        </div>
      </div>

      {/* Subtle decorative element */}
      <div className='h-1 bg-blue-500' />
    </div>
  )
}

export default Card
