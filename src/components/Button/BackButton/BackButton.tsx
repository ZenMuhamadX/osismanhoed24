import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const BackButton = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className='container flex justify-center items-center mx-auto px-4 py-8 text-center'>
      <button
        onClick={handleGoBack}
        className='flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
      >
        <ArrowLeft size={20} className='w-5 h-5' />
        Kembali
      </button>
    </div>
  )
}
