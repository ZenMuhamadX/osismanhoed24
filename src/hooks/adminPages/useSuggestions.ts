import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Suggestion } from '../../types'

export const useSuggestions = (currentPage: number, pageSize: number) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [totalPages, setTotalPages] = useState(1)

  const fetchSuggestions = async () => {
    const { data, count } = await supabase
      .from('suggestions')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((currentPage - 1) * pageSize, currentPage * pageSize - 1)

    setSuggestions(data || [])
    setTotalPages(Math.ceil((count || 0) / pageSize))
  }

  useEffect(() => {
    fetchSuggestions()
  }, [currentPage])

  return { suggestions, totalPages, fetchSuggestions }
}
