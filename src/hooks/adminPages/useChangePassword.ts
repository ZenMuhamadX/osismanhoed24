import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useUserData } from '../useUserData'

export const useChangePassword = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const { userData } = useUserData()

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validasi input
    if (newPassword.length < 8) {
      setError('Password minimal 8 karakter')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Konfirmasi password tidak cocok')
      return
    }

    setLoading(true)

    try {
      if (!userData) {
        setError('Pengguna tidak terautentikasi')
        return
      }

      // Update password
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) {
        setError(error.message)
        return
      }

      // Reset form
      setNewPassword('')
      setConfirmPassword('')
      setSuccess('Password berhasil diubah')

      // Logout dan redirect
      await supabase.auth.signOut({ scope: 'global' })
      navigate('/login')
    } catch (err) {
      setError('Terjadi kesalahan saat mengubah password')
    } finally {
      setLoading(false)
    }
  }

  return {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    success,
    loading,
    handlePasswordChange,
  }
}
