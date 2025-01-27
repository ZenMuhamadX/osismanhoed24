import React from 'react'
import { Eye, EyeOff, Lock, AlertCircle, CheckCircle2, ArrowRight, Shield } from 'lucide-react'
import { useChangePassword } from '../../hooks/adminPages/useChangePassword'
import { checkSession } from '../../lib/checkSession'
import { BackPrevRoute } from '../../components/Button/BackButton/BackPrevRoute'

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

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, text: '', color: '' }
    if (password.length < 8) return { strength: 25, text: 'Lemah', color: 'bg-red-500' }
    if (password.length < 10) return { strength: 50, text: 'Sedang', color: 'bg-yellow-500' }
    if (password.length < 12) return { strength: 75, text: 'Kuat', color: 'bg-blue-500' }
    return { strength: 100, text: 'Sangat Kuat', color: 'bg-green-500' }
  }

  const passwordStrength = getPasswordStrength(newPassword)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-8">
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 p-3 rounded-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Ganti Password</h1>
                <p className="text-green-100 mt-1">Buat password baru yang aman</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Alert Messages */}
            {error && (
              <div className="flex items-center space-x-2 bg-red-50 text-red-700 px-4 py-3 rounded-xl mb-6">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-3 rounded-xl mb-6">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <p>{success}</p>
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-6">
              {/* New Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password Baru
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Minimal 8 karakter"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-200"
                    autoComplete="new-password"
                    maxLength={128}
                    minLength={8}
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {newPassword.length > 0 && (
                  <div className="mt-2">
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${passwordStrength.color} transition-all duration-300`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      />
                    </div>
                    <p className={`text-sm mt-1 ${newPassword.length < 8 ? 'text-red-500' : 'text-gray-600'}`}>
                      {passwordStrength.text}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konfirmasi Password Baru
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Konfirmasi password baru"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-200"
                    autoComplete="new-password"
                    maxLength={128}
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {confirmPassword !== newPassword && confirmPassword.length > 0 && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    Password tidak cocok
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-xl flex items-center justify-center space-x-2 text-white font-medium
                  ${loading 
                    ? 'bg-green-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-300'
                  }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-3 border-t-transparent border-white rounded-full animate-spin" />
                    <span>Sedang Diproses...</span>
                  </>
                ) : (
                  <>
                    <span>Ganti Password</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <BackPrevRoute />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}