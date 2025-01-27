import React, { useState } from 'react'
import {
  ImagePlus,
  Upload,
  Trash2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import { useUserData } from '../../hooks/useUserData'
import { useAvatarUpload } from '../../hooks/adminPages/useAvatarsUpload'
import { checkSession } from '../../lib/checkSession'

export const ChangeAvatar: React.FC = () => {
  checkSession()
  const { userData } = useUserData()
  const { loading, message, handleAvatarUpload } = useAvatarUpload(userData)

  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      // Revoke previous preview URL to prevent memory leaks
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }

      setAvatarFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleRemoveFile = () => {
    // Revoke preview URL to prevent memory leaks
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    setAvatarFile(null)
    setPreviewUrl(null)
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6 border border-green-100'>
        <h1 className='text-3xl font-bold mb-6 text-green-800 text-center flex items-center justify-center'>
          <ImagePlus className='mr-3 text-green-600' size={32} />
          Ganti Avatar
        </h1>

        {/* Avatar Preview */}
        <div className='flex justify-center mb-4'>
          {previewUrl ? (
            <div className='relative'>
              <img
                src={previewUrl}
                alt='Avatar Preview'
                className='w-40 h-40 rounded-full object-cover border-4 border-green-500 shadow-md'
              />
              <div className='absolute bottom-0 right-0 bg-green-600 text-white rounded-full p-2'>
                <CheckCircle size={20} />
              </div>
            </div>
          ) : (
            <div className='w-40 h-40 rounded-full bg-green-100 flex items-center justify-center text-green-600 border-4 border-green-300'>
              <ImagePlus size={48} />
            </div>
          )}
        </div>

        {/* File Input */}
        <div>
          <label
            htmlFor='file-input'
            className='flex items-center justify-center w-full px-4 py-3 text-center bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-700 transition group'
          >
            <Upload className='mr-2' size={20} />
            Pilih File
            <input
              id='file-input'
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              className='hidden'
            />
          </label>
        </div>

        {/* Actions */}
        {avatarFile && (
          <div className='flex items-center justify-center space-x-4'>
            <button
              onClick={() => handleAvatarUpload(avatarFile, previewUrl)}
              disabled={loading}
              className='flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50'
            >
              <Upload className='mr-2' size={20} />
              {loading ? 'Uploading...' : 'Upload'}
            </button>
            <button
              onClick={handleRemoveFile}
              className='flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition'
            >
              <Trash2 className='mr-2' size={20} />
              Hapus
            </button>
          </div>
        )}

        {/* Status Message */}
        {message && (
          <p
            className={`text-center mt-2 text-sm flex items-center justify-center ${
              message.includes('successfully')
                ? 'text-green-700'
                : 'text-red-600'
            }`}
          >
            {message.includes('successfully') ? (
              <CheckCircle className='mr-2' size={20} />
            ) : (
              <AlertCircle className='mr-2' size={20} />
            )}
            {message}
          </p>
        )}
      </div>
    </div>
  )
}
