import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Member } from './useMembers'

export const useMemberActions = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addMember = async (newMember: Member) => {
    if (!newMember.name || !newMember.role) {
      setError('Nama dan Role harus diisi!')
      setTimeout(() => setError(null), 3000)
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      const { error } = await supabase.from('members').insert([newMember])
      if (error) throw error
    } catch (error) {
      console.error('Error adding member:', error)
      setError('Gagal menambahkan anggota.')
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteMember = async (name: string, fetchMembers: () => void) => {
    try {
      setIsLoading(true)
      setError(null)
      const { error } = await supabase.from('members').delete().eq('name', name)
      if (error) throw error
      fetchMembers() // Refresh data setelah penghapusan
    } catch (error) {
      console.error('Error deleting member:', error)
      setError('Gagal menghapus anggota.')
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    addMember,
    deleteMember,
  }
}
