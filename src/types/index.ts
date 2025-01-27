export interface Suggestion {
  id: number
  name: string
  message: string
  created_at: string
  status: 'unread' | 'read'
  class: string
}

export interface Program {
  id: number
  title: string
}

export interface Member {
  name: string
  role: string
  gender: 'male' | 'female'
  motto: string
}

export interface UserCardProps {
  name: string
  role: string
  gender: 'male' | 'female' // Gender sebagai props
  onDelete: () => Promise<void> // Fungsi untuk delete user
}

export interface AccountMenuItem {
  icon: React.ElementType
  title: string
  description: string
  route: string
}
