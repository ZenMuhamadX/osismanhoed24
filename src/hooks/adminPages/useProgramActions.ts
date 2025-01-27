import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export const useProgramActions = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addProgram = async (
    newProgram: string,
    fetchPrograms: () => Promise<void>,
  ) => {
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

      await fetchPrograms()
    } catch (err) {
      console.error('Error adding program:', err)
      setError('Gagal menambahkan program kerja')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteProgram = async (id: number, fetchPrograms: () => void) => {
    try {
      setIsLoading(true)
      setError(null)
      const { error } = await supabase.from('programs').delete().eq('id', id)

      if (error) throw error

      fetchPrograms() // Refresh data setelah penghapusan
    } catch (err) {
      console.error('Error deleting program:', err)
      setError('Gagal menghapus program kerja')
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, error, addProgram, deleteProgram }
}
