import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export const useSuggestionActions = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const markAsRead = async (id: number) => {
    try {
      setIsLoading(true)
      await supabase.from('suggestions').update({ status: 'read' }).eq('id', id)
    } catch (err) {
      setError('Gagal menandai saran sebagai dibaca')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteSuggestion = async (id: number) => {
    try {
      setIsLoading(true)
      await supabase.from('suggestions').delete().eq('id', id)
    } catch (err) {
      setError('Gagal menghapus saran')
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, error, markAsRead, deleteSuggestion }
}
