import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Member } from '../../types'

export const useMembers = () => {
  const [members, setMembers] = useState<Member[]>([])
  const [isfetching, setIsFetching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMembers = async () => {
    try {
      setIsFetching(true)
      setError(null)
      const { data, error } = await supabase.from('members').select('*')
      if (error) throw error
      setMembers(data || [])
    } catch (error) {
      console.error('Error fetching members:', error)
      setError('Gagal mengambil data anggota.')
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  return {
    members,
    isfetching,
    error,
    fetchMembers,
  }
}
