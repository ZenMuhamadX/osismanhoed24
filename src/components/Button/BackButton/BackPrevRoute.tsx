import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const BackPrevRoute = () => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(-1)
  }

  return (
    <button
      onClick={handleNavigate}
      className='flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-green-700 transition-all duration-200'
    >
      <ArrowLeft size={20} className='w-5 h-5' />
      Back
    </button>
  )
}
