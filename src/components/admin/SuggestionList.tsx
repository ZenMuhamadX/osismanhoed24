import { FC, useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

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

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-4'>Kotak Saran</h2>

      <div className='grid grid-cols-1 gap-4'>
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className={`p-4 rounded shadow-lg cursor-pointer ${
              suggestion.status === 'unread'
                ? 'bg-gradient-to-r from-green-700 to-green-500'
                : 'bg-gray-200'
            }`}
            onClick={() => openModal(suggestion)}
          >
            <div className='flex justify-between items-center'>
              <h3 className='text-lg font-semibold'>{suggestion.name}</h3>
              <button
                className='text-red-500 hover:text-red-700'
                onClick={(e) => {
                  e.stopPropagation() // Prevent click event dari parent
                  deleteSuggestion(suggestion.id)
                }}
              >
                Hapus
              </button>
            </div>
            <p className='mt-2'>{suggestion.message.slice(0, 50)}...</p>
            <p className='text-sm text-gray-600 mt-2'>
              {new Date(suggestion.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className='flex justify-center items-center mt-6'>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className={`px-4 py-2 mr-2 rounded ${
            currentPage === 1
              ? 'bg-gray-300 text-gray-500'
              : 'bg-green-500 text-white hover:bg-green-700'
          }`}
        >
          Previous
        </button>
        <span className='text-lg font-semibold'>{currentPage}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className={`px-4 py-2 ml-2 rounded ${
            currentPage === totalPages
              ? 'bg-gray-300 text-gray-500'
              : 'bg-green-500 text-white hover:bg-green-700'
          }`}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && selectedSuggestion && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded shadow-lg w-11/12 sm:w-1/2'>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl font-bold'>Detail Saran</h2>
              <button
                onClick={closeModal}
                className='text-gray-500 hover:text-gray-700 text-xl'
              >
                &times;
              </button>
            </div>
            <div className='mt-4'>
              <p>
                <span className='font-semibold'>Nama:</span>{' '}
                {selectedSuggestion.name}
              </p>
              <p>
                <span className='font-semibold'>Tanggal:</span>{' '}
                {new Date(selectedSuggestion.created_at).toLocaleString()}
              </p>
              <p className='mt-4'>
                <span className='font-semibold'>Isi Saran:</span>
              </p>
              <p className='mt-2 p-2 border rounded bg-gray-100'>
                {selectedSuggestion.message}
              </p>
            </div>
            <div className='mt-6 text-right'>
              <button
                onClick={closeModal}
                className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700'
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
