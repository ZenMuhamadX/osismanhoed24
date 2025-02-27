import { supabase } from './supabase'

export const getAvatars = (id: string): { data: { publicUrl: string } } => {
  return supabase.storage.from('avatars').getPublicUrl(`avatars/${id}`)
}
