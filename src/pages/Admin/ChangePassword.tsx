import React from 'react'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { BackToDashboardButton } from '../../components/Button/BackButton/backToDashboard'
import { useChangePassword } from '../../hooks/adminPages/useChangePassword'
import { checkSession } from '../../lib/checkSession'

export const ChangePassword: React.FC = () => {
  checkSession()
  const {
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
  } = useChangePassword()

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-sm'>
        <h1 className='text-xl font-bold text-center text-green-700 mb-4'>
          Ganti Password
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

        <form onSubmit={handlePasswordChange} className='space-y-4 p-2'>
          {/* New Password Input */}
          <div className='relative'>
            <label
              htmlFor='new-password'
              className='block text-sm font-medium text-gray-700 mb-4'
            >
              Password Baru
            </label>
            <div className='relative'>
              <input
                id='new-password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Masukkan password baru'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='w-full pl-10 pr-10 py-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm'
                autoComplete='new-password'
                maxLength={128}
                minLength={8}
                required
              />
              <Lock
                className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
              <button
                type='button'
                onClick={() => setShowPassword((prev) => !prev)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none'
                aria-label={
                  showPassword ? 'Sembunyikan password' : 'Tampilkan password'
                }
              >
                {showPassword ? (
                  <EyeOff className='h-5 w-5' />
                ) : (
                  <Eye className='h-5 w-5' />
                )}
              </button>
            </div>
            {newPassword.length > 0 && newPassword.length < 8 && (
              <p className='text-red-500 text-xs mt-1'>
                Password minimal 8 karakter
              </p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className='relative'>
            <label
              htmlFor='confirm-password'
              className='block text-sm font-medium text-gray-700 mb-4'
            >
              Konfirmasi Password Baru
            </label>
            <div className='relative mb-4'>
              <input
                id='confirm-password'
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Konfirmasi password baru'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='w-full pl-10 pr-10 py-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm'
                autoComplete='new-password'
                maxLength={128}
                required
              />
              <Lock
                className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none'
                aria-label={
                  showConfirmPassword
                    ? 'Sembunyikan password'
                    : 'Tampilkan password'
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className='h-5 w-5' />
                ) : (
                  <Eye className='h-5 w-5' />
                )}
              </button>
            </div>
            {confirmPassword !== newPassword && confirmPassword.length > 0 && (
              <p className='text-red-500 text-xs mt-1'>
                Konfirmasi password tidak cocok
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className={`w-full py-3 rounded-md shadow-md text-sm font-medium text-white transition-all duration-300 ease-in-out 
              ${
                loading
                  ? 'bg-green-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              }`}
            disabled={loading}
          >
            {loading ? (
              <div className='flex items-center justify-center gap-2'>
                <div className='w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin'></div>
                Sedang Diproses...
              </div>
            ) : (
              'Ganti Password'
            )}
          </button>
        </form>
        <div className='flex justify-center items-center mt-4'>
          <BackToDashboardButton />
        </div>
      </div>
    </div>
  )
}
