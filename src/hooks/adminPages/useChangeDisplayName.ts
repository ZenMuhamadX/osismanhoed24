import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export const useChangeDisplayName = () => {
  const navigate = useNavigate()
  const [newDisplayName, setNewDisplayName] = useState('')
  const [newRole, setNewRole] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    setError('')
    setSuccess('')
    setLoading(true)

    try {
      // Mendapatkan user saat ini
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError('Pengguna tidak terautentikasi')
        return
      }

      // Update Display Name & Role
      const { error } = await supabase.auth.updateUser({
        data: {
          display_name: newDisplayName,
          role: newRole,
        },
      })

      if (error) {
        setError(error.message)
        return
      }

      setSuccess('Display name berhasil diubah!')
      setTimeout(() => {
        navigate('/dashboard')
      }, 1000)
    } catch (err) {
      setError('Terjadi kesalahan saat mengupdate data, silakan coba lagi')
    } finally {
      setLoading(false)
    }
  }

  return {
    newDisplayName,
    setNewDisplayName,
    newRole,
    setNewRole,
    error,
    success,
    loading,
    handleUpdate,
  }
}
