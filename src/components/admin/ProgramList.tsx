import { FC, useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { ClipboardList, Plus, Trash2, Loader2 } from 'lucide-react'

interface Program {
  id: number
  title: string
}

export const ProgramList: FC = () => {
  const [programs, setPrograms] = useState<Program[]>([])
  const [newProgram, setNewProgram] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPrograms = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const { data, error } = await supabase.from('programs').select('*')

      if (error) throw error
      setPrograms(data || [])
    } catch (err) {
      console.error('Error fetching programs:', err)
      setError('Gagal memuat program kerja')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPrograms()
  }, [])

  const addProgram = async () => {
    if (!newProgram.trim()) {
      setError('Program kerja tidak boleh kosong')
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      const { error } = await supabase
        .from('programs')
        .insert([{ title: newProgram.trim() }])

      if (error) throw error

      setNewProgram('')
      await fetchPrograms()
    } catch (err) {
      console.error('Error adding program:', err)
      setError('Gagal menambahkan program kerja')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteProgram = async (id: number) => {
    try {
      setIsLoading(true)
      setError(null)
      const { error } = await supabase.from('programs').delete().eq('id', id)

      if (error) throw error
      setPrograms((prev) => prev.filter((program) => program.id !== id))
    } catch (err) {
      console.error('Error deleting program:', err)
      setError('Gagal menghapus program kerja')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      addProgram()
    }
  }

  return (
    <div className='p-4 sm:p-6 bg-white rounded-lg shadow-lg'>
      <div className='flex items-center gap-2 mb-6'>
        <ClipboardList className='w-6 h-6 text-green-700' />
        <h2 className='text-2xl font-bold text-green-700'>Program Kerja</h2>
      </div>

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
            onClick={addProgram}
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

      {isLoading && programs.length === 0 ? (
        <div className='flex items-center justify-center p-8 text-gray-500'>
          <Loader2 className='w-6 h-6 animate-spin mr-2' />
          Memuat program kerja...
        </div>
      ) : programs.length === 0 ? (
        <div className='text-center py-8 text-gray-500'>
          Belum ada program kerja yang ditambahkan
        </div>
      ) : (
        <ul className='space-y-2'>
          {programs.map((program) => (
            <li
              key={program.id}
              className='flex justify-between items-center bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow group'
            >
              <span className='text-gray-700'>{program.title}</span>
              <button
                onClick={() => deleteProgram(program.id)}
                disabled={isLoading}
                className='flex items-center gap-1 px-3 py-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <Trash2 className='w-4 h-4' />
                Hapus
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
