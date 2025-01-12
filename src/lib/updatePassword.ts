import { supabase } from './supabase'
export const updateUser = async (
  email: string,
  password: string,
  newPassword: string,
) => {
  const { data } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  await supabase.auth.updateUser({
    password: newPassword,
  })
  console.log(data.user?.user_metadata.display_name)
  await supabase.auth.signOut({
    scope: 'global',
  })
}
