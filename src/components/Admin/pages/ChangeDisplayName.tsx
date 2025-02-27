import React, { useState } from 'react'
import { UserCheck, AppWindow, Loader2 } from 'lucide-react'
import { supabase } from '../../../lib/supabase'
import { useNavigate } from 'react-router-dom'
import { BackToDashboardButton } from '../../Button/BackButton/backToDashboard'

export const ChangeDisplayName: React.FC = () => {
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

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-sm'>
        <h1 className='text-xl font-bold text-center text-green-700 mb-4'>
          Ganti Display Name
        </h1>

        {/* Error Message */}
        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4 text-center'>
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md mb-4 text-center'>
            {success}
          </div>
        )}

        <form onSubmit={handleUpdate} className='space-y-4 p-2'>
          {/* New Display Name Input */}
          <div className='relative'>
            <label
              htmlFor='new-displayName'
              className='block text-sm font-medium text-gray-700 mb-4'
            >
              Nama Baru
            </label>
            <div className='relative'>
              <input
                id='new-displayName'
                placeholder='Masukkan nama baru'
                value={newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
                className='w-full pl-10 pr-10 py-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm'
                autoComplete='new-password'
                maxLength={128}
                minLength={4}
                required
              />
              <UserCheck
                className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </div>
          </div>

          {/* New Role Input */}
          <div className='relative'>
            <label
              htmlFor='new-role'
              className='block text-sm font-medium text-gray-700 mb-4'
            >
              Jabatan
            </label>
            <div className='relative'>
              <input
                id='new-role'
                placeholder='Masukkan jabatan baru'
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className='w-full pl-10 pr-10 py-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm'
                autoComplete='new-password'
                maxLength={128}
                required
              />
              <AppWindow
                className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className={`w-full py-3 rounded-md shadow-md text-sm font-medium text-white transition-all duration-300 ease-in-out 
              ${
                loading
                  ? 'bg-green-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-green-700 hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              }`}
            disabled={loading}
          >
            {loading ? (
              <div className='flex items-center justify-center gap-2'>
                <Loader2 className='animate-spin h-5 w-5' />
                Sedang Diproses...
              </div>
            ) : (
              'Ganti'
            )}
          </button>
        </form>

        {/* Back Button */}
        <div className='flex justify-center items-center mt-4'>
          <BackToDashboardButton />
        </div>
      </div>
    </div>
  )
}
