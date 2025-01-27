import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Program } from '../../types'

export const usePrograms = () => {
  const [programs, setPrograms] = useState<Program[]>([])
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

  return { programs, isLoading, error, fetchPrograms }
}
