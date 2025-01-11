import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { BackButton } from '../components/button/BackButton'
import { Mail, Lock } from 'lucide-react' // Import ikon dari Lucide
import { useNavigate } from 'react-router-dom'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate() // Inisialisasi useNavigate untuk navigasi

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
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm'
                required
              />
              <Mail
                className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </div>
          </div>

          {/* Password Input */}
          <div className='relative'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <div className='relative mt-1'>
              <input
                id='password'
                type='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm'
                required
              />
              <Lock
                className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type='submit'
            className='w-full py-2 px-4 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-sm font-medium'
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {/* Back Button */}
        <div>
          <BackButton />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
