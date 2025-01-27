import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { genId } from '../../lib/genId'
import { useNavigate } from 'react-router-dom'

export const useAvatarUpload = (userData: any) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleAvatarUpload = async (
    avatarFile: File | null,
    previewUrl: string | null,
  ) => {
    if (!avatarFile) {
      setMessage('Please select a file.')
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      // Remove existing avatar if it exists
      const existingAvatarId = userData?.data.user?.user_metadata.avatar_id
      if (existingAvatarId) {
        await supabase.storage
          .from('avatars')
          .remove([`avatars/${existingAvatarId}`])
      }

      // Generate unique ID for the new avatar
      const uniqueId = genId()

      // Upload new avatar
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(`avatars/${uniqueId}`, avatarFile, {
          cacheControl: '3600',
          upsert: true,
        })

      if (uploadError) throw uploadError

      // Update user metadata with new avatar ID
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          avatar_id: uniqueId,
        },
      })

      if (updateError) throw updateError

      setMessage('Avatar uploaded successfully!')

      // Clean up preview URL to prevent memory leaks
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
      setTimeout(() => {
        navigate('/dashboard')
      }, 1000)
    } catch (err) {
      console.error('Error uploading avatar:', err)
      setMessage('Failed to upload avatar.')
    } finally {
      setLoading(false)
    }
  }

  return { loading, message, handleAvatarUpload }
}
