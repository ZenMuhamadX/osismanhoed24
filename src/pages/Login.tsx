import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react' // Import ikon dari Lucide
import { useNavigate } from 'react-router-dom'

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate() // Inisialisasi useNavigate untuk navigasi

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error
        if (data.session) {
          navigate('/dashboard')
        }
      } catch (error) {
        console.error('Error checking session:', error)
        navigate('/dashboard')
      }
    }
    checkSession()
  }, [navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      navigate('/dashboard') // Mengarahkan ke dashboard
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-green-700 to-green-500 px-4'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-sm'>
        <h1 className='text-xl font-bold text-center text-green-700 mb-4'>
          Selamat Datang!
        </h1>
        {error && (
          <p className='text-red-500 text-xs mb-4 text-center'>{error}</p>
        )}
        <form onSubmit={handleLogin} className='space-y-4'>
          {/* Email Input */}
          <div className='relative'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <div className='relative mt-1'>
              <input
                id='email'
                type='email'
                name='email' // Nama field, berguna jika Anda akan mengirim data ke backend
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm'
                autoComplete='off' // Mencegah autofill
                inputMode='email' // Memberikan keyboard email di perangkat mobile
                aria-label='Email' // Aksesibilitas tambahan untuk pembaca layar
                maxLength={254} // Batas panjang input (RFC 5321, batas email maksimal 254 karakter)
                required // Menandakan bahwa input wajib diisi
                spellCheck='false' // Menonaktifkan pemeriksaan ejaan pada input
              />
              <Mail
                className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </div>
          </div>

          {/* Password Input */}
          <div className='relative'>
            {/* Label */}
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>

            {/* Input Container */}
            <div className='relative mt-1'>
              <input
                id='password'
                type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
                name='password' // Nama field untuk pengiriman form
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full pl-10 pr-10 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm transition-all duration-300 ease-in-out'
                autoComplete='new-password' // Menghindari autofill default browser
                spellCheck='false' // Menonaktifkan pemeriksaan ejaan
                aria-label='Password' // Memberikan label untuk aksesibilitas
                maxLength={128} // Batas panjang password
                minLength={8} // Panjang minimal password
                required // Input wajib diisi
              />

              {/* Ikon Gembok */}
              <Lock
                className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 transition-transform duration-300 ease-in-out'
                aria-hidden='true'
              />

              {/* Tombol Show/Hide Password */}
              <button
                type='button'
                onClick={() => setShowPassword((prev) => !prev)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-300 ease-in-out'
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff
                    className='h-5 w-5 transition-transform duration-300 ease-in-out'
                    aria-hidden='true'
                  />
                ) : (
                  <Eye
                    className='h-5 w-5 transition-transform duration-300 ease-in-out'
                    aria-hidden='true'
                  />
                )}
              </button>
            </div>
          </div>
          {/* Login Button */}
          <button
            type='submit'
            className={`w-full py-2 px-4 rounded-md shadow-md text-sm font-medium text-white transition-all duration-300 ease-in-out 
    ${loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500'}`}
            disabled={loading}
          >
            {loading ? (
              <div className='flex items-center justify-center gap-2'>
                <div className='w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin'></div>
                Logging in...
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>
        <div>
          <p className='text-center font-mono text-sm mt-4 text-gray-500'>
            Login untuk mengakses dashboard
          </p>
        </div>
      </div>
    </div>
  )
}
