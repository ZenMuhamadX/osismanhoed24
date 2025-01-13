import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { BackButton } from '../components/Button/BackButton/BackButton'
import { supabase } from '../lib/supabase'
import { Footer } from '../components/Footer'
import { genId } from '../lib/genId'

export const Suggestion = () => {
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    message: '',
    id: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      id: genId(),
      [name]: value,
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    // **Validasi input**
    setIsSubmitting(true)
    setError('')
    if (
      !formData.name.trim() || // Name tidak boleh kosong atau hanya spasi
      !formData.class.trim() || // Class tidak boleh kosong atau hanya spasi
      !formData.message.trim() || // Message tidak boleh kosong atau hanya spasi
      formData.message.trim().length < 5 // Message minimal 5 karakter
    ) {
      setError('Semua field wajib diisi, dan saran minimal 5 karakter.')
      setIsSubmitting(false)
      setSubmitStatus('error')
      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmitStatus('')
      }, 3000)
      return
    }

    try {
      const response = await supabase.from('suggestions').insert(formData)

      if (response.error) {
        throw new Error('Gagal mengirim saran')
      }

      setSubmitStatus('success')
      setFormData({ name: '', class: '', message: '', id: '' })

      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmitStatus('')
      }, 3000)
    } catch (err: any) {
      setError(err?.message || 'Terjadi kesalahan saat mengirim data.')
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className='bg-gradient-to-b from-green-700 to-green-500'>
      {/* Form Container */}
      <div className='container mx-auto px-4 py-8 max-w-2xl'>
        <div className='bg-white rounded-xl shadow-lg p-6 md:p-8'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Name */}
            <div>
              <label
                htmlFor='name'
                className='block text-gray-700 font-medium mb-2'
              >
                Nama (boleh anonim)
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete='off'
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all'
                placeholder='Masukkan nama (boleh anonim)'
              />
            </div>

            {/* Class */}
            <div>
              <label
                htmlFor='class'
                className='block text-gray-700 font-medium mb-2'
              >
                Kelas
              </label>
              <input
                type='text'
                id='class'
                name='class'
                value={formData.class}
                onChange={handleChange}
                required
                autoComplete='off'
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all'
                placeholder='Contoh: XI IPA 1'
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor='message'
                className='block text-gray-700 font-medium mb-2'
              >
                Pesan / Saran
              </label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                required
                autoComplete='off'
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none'
                placeholder='Tuliskan saran atau aspirasi Anda...'
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type='submit'
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 text-white transition-all
                  ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
              >
                {isSubmitting ? (
                  'Mengirim...'
                ) : (
                  <>
                    Kirim Saran
                    <Send className='h-5 w-5' />
                  </>
                )}
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className='flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg'>
                <CheckCircle className='h-5 w-5' />
                <p>Terima kasih! Saran Anda telah berhasil terkirim.</p>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className='text-red-600 bg-red-50 p-4 rounded-lg'>
                <p>Error: {error}</p>
              </div>
            )}
          </form>
        </div>
      </div>
      <BackButton />
      <Footer />
    </div>
  )
}
