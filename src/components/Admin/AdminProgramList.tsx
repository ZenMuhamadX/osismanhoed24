import { FC, useState } from 'react'
import { ClipboardList, Plus, Trash2, Loader2, Folder } from 'lucide-react'
import { BackToDashboardButton } from '../Button/BackButton/BackPrevRoute'
import { useProgramActions } from '../../hooks/adminPages/useProgramActions'
import { usePrograms } from '../../hooks/adminPages/useProgram'
import { checkSession } from '../../lib/checkSession'

export const AdminProgramList: FC = () => {
  const [newProgram, setNewProgram] = useState('')
  const {
    programs,
    isLoading: isFetching,
    error: fetchError,
    fetchPrograms,
  } = usePrograms()
  const { isLoading, error, addProgram, deleteProgram } = useProgramActions()

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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      addProgram(newProgram, fetchPrograms)
      setNewProgram('')
    }
  }

  return (
    <div className='p-4 sm:p-6 bg-white rounded-lg shadow-lg'>
      <div className='flex items-center gap-2 mb-6'>
        <ClipboardList className='w-6 h-6 text-green-700' />
        <h2 className='text-2xl font-bold text-green-700'>Program Kerja</h2>
        <div className='ml-auto'>
          <BackToDashboardButton />
        </div>
      </div>

      {fetchError && (
        <div className='mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg'>
          {fetchError}
        </div>
      )}

      {error && (
        <div className='mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg'>
          {error}
        </div>
      )}

      <div className='mb-6'>
        <div className='mb-4'>
          <input
            type='text'
            placeholder='Masukkan program kerja baru'
            value={newProgram}
            onChange={(e) => setNewProgram(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className='w-full px-4 py-3 rounded-lg border border-green-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed'
          />
        </div>
        <div className='mb-6'>
          <button
            onClick={() => {
              addProgram(newProgram, fetchPrograms)
              setNewProgram('')
            }}
            disabled={isLoading}
            className='w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-700 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? (
              <Loader2 className='w-5 h-5 animate-spin' />
            ) : (
              <Plus className='w-5 h-5' />
            )}
            Tambah
          </button>
        </div>
      </div>

      {isFetching && programs.length === 0 ? (
        <div className='flex items-center justify-center p-8 text-gray-500'>
          <Loader2 className='w-6 h-6 animate-spin mr-2' />
          Memuat program kerja...
        </div>
      ) : programs.length === 0 ? (
        <div className='text-center py-8 text-gray-500'>
          Belum ada program kerja yang ditambahkan
        </div>
      ) : (
        <ul className='space-y-3'>
          {programs.map((program) => (
            <li
              key={program.id}
              className='flex justify-between items-center bg-white p-4 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200 group'
            >
              {/* Judul Program */}
              <div className='flex items-center space-x-3'>
                <div className='p-2 bg-gray-100 rounded-full'>
                  <Folder className='w-5 h-5 text-gray-500' />{' '}
                  {/* Ikon folder */}
                </div>
                <span className='text-gray-800 text-sm font-medium'>
                  {program.title}
                </span>
              </div>

              {/* Tombol Hapus */}
              <button
                onClick={() => deleteProgram(program.id, fetchPrograms)}
                disabled={isLoading}
                className='flex items-center gap-2 px-3 py-1.5 text-red-500 hover:text-white hover:bg-red-500 rounded-lg border border-red-500 transition-all duration-150 opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <Trash2 className='w-4 h-4' />
                <span className='text-sm'>Hapus</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
