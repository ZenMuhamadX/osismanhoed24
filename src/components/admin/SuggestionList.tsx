import { FC, useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { checkSession } from '../../lib/checkSession'
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Loader2,
  MessageSquare,
  Trash2,
  User,
  X,
} from 'lucide-react'
import { BackToDashboardButton } from '../button/backToDashboard'

interface Suggestion {
  id: number
  name: string
  message: string
  created_at: string
  status: 'unread' | 'read'
}

export const SuggestionList: FC = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<Suggestion | null>(null) // Untuk modal
  const [isModalOpen, setIsModalOpen] = useState(false)

  const pageSize = 5 // Jumlah saran per halaman

  // Fetch suggestions dari Supabase
  useEffect(() => {
    const fetchSuggestions = async () => {
      const { data, count } = await supabase
        .from('suggestions')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((currentPage - 1) * pageSize, currentPage * pageSize - 1)

      setSuggestions(data || [])
      setTotalPages(Math.ceil((count || 0) / pageSize))
    }

    fetchSuggestions()
  }, [currentPage])

  // Mark suggestion as read
  const markAsRead = async (id: number) => {
    await supabase.from('suggestions').update({ status: 'read' }).eq('id', id)

    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'read' } : s)),
    )
  }

  // Open modal
  const openModal = (suggestion: Suggestion) => {
    setSelectedSuggestion(suggestion)
    setIsModalOpen(true)

    if (suggestion.status === 'unread') {
      markAsRead(suggestion.id) // Mark as read ketika dibuka
    }
  }

  // Close modal
  const closeModal = () => {
    setSelectedSuggestion(null)
    setIsModalOpen(false)
  }

  // Delete suggestion
  const deleteSuggestion = async (id: number) => {
    await supabase.from('suggestions').delete().eq('id', id)

    setSuggestions((prev) => prev.filter((s) => s.id !== id))
  }

  const { user } = checkSession()

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

  return (
    <div className='p-4 md:p-6'>
      <div className='flex items-center gap-2 mb-6'>
        <MessageSquare className='w-6 h-6 text-green-700' />
        <h2 className='text-2xl font-bold text-green-700'>Kotak saran</h2>
        <div className='ml-auto'>
          <BackToDashboardButton />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className={`p-4 rounded-lg shadow-lg cursor-pointer transition-all duration-200 hover:shadow-xl ${
              suggestion.status === 'unread'
                ? 'bg-gradient-to-r from-green-700 to-green-500 text-white'
                : 'bg-white border border-gray-200 hover:border-green-500'
            }`}
            onClick={() => openModal(suggestion)}
          >
            <div className='flex justify-between items-center'>
              <h3 className='text-lg font-semibold flex items-center gap-2'>
                <User className='w-4 h-4' />
                {suggestion.name}
              </h3>
              <button
                className={`p-2 rounded-full hover:bg-opacity-10 hover:bg-black transition-colors ${
                  suggestion.status === 'unread' ? 'text-white' : 'text-red-500'
                }`}
                onClick={(e) => {
                  e.stopPropagation()
                  deleteSuggestion(suggestion.id)
                }}
              >
                <Trash2 className='w-4 h-4' />
              </button>
            </div>
            <p
              className={`mt-2 ${suggestion.status === 'unread' ? 'text-white/90' : 'text-gray-600'}`}
            >
              {suggestion.message.slice(0, 50)}...
            </p>
            <p
              className={`text-sm mt-2 flex items-center gap-1 ${
                suggestion.status === 'unread'
                  ? 'text-white/80'
                  : 'text-gray-500'
              }`}
            >
              <Calendar className='w-4 h-4' />
              {new Date(suggestion.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className='flex justify-center items-center mt-8 gap-4'>
        <button
          disabled={currentPage === 1 || suggestions.length === 0}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className={`p-2 rounded-full transition-colors ${
            currentPage === 1 || suggestions.length === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          <ChevronLeft className='w-5 h-5' />
        </button>
        <span className='text-lg font-semibold text-green-700'>
          {currentPage}
        </span>
        <button
          disabled={currentPage === totalPages || suggestions.length === 0}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className={`p-2 rounded-full transition-colors ${
            currentPage === totalPages || suggestions.length === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          <ChevronRight className='w-5 h-5' />
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && selectedSuggestion && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4'>
          <div className='bg-white rounded-lg shadow-xl w-full max-w-2xl'>
            <div className='p-6 border-b border-gray-200'>
              <div className='flex justify-between items-center'>
                <h2 className='text-2xl font-bold text-green-700'>
                  Detail Saran
                </h2>
                <button
                  onClick={closeModal}
                  className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                >
                  <X className='w-6 h-6 text-gray-500' />
                </button>
              </div>
            </div>
            <div className='p-6'>
              <div className='space-y-4'>
                <div className='flex items-center gap-2'>
                  <User className='w-5 h-5 text-green-600' />
                  <span className='font-semibold'>Nama:</span>
                  <span>{selectedSuggestion.name}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='w-5 h-5 text-green-600' />
                  <span className='font-semibold'>Tanggal:</span>
                  <span>
                    {new Date(selectedSuggestion.created_at).toLocaleString()}
                  </span>
                </div>
                <div>
                  <p className='font-semibold mb-2'>Isi Saran:</p>
                  <p className='p-4 rounded-lg bg-gray-50 border border-gray-200'>
                    {selectedSuggestion.message}
                  </p>
                </div>
              </div>
            </div>
            <div className='p-6 border-t border-gray-200 flex justify-end'>
              <button
                onClick={closeModal}
                className='px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2'
              >
                <X className='w-4 h-4' />
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
