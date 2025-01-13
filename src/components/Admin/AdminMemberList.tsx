import { FC, useEffect, useState } from 'react'
import { AdminUserCard } from './AdminUserCard'
import { supabase } from '../../lib/supabase'
import { UserPlus, Users, Loader2 } from 'lucide-react'
import { checkSession } from '../../lib/checkSession'
import { BackToDashboardButton } from '../Button/BackButton/backToDashboard'

export interface Member {
  id: number
  name: string
  role: string
  gender: 'male' | 'female'
  motto: string
}

export const AdminMemberList: FC = () => {
  const [error, setError] = useState<string | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    gender: 'male' as 'male' | 'female',
    motto: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const fetchMembers = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const { data, error } = await supabase.from('members').select('*')
      if (error) throw error
      setMembers(data || [])
    } catch (error) {
      console.error('Error fetching members:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const addMember = async () => {
    if (!newMember.name || !newMember.role) {
      setError('Nama dan Role harus diisi!')
      setTimeout(() => {
        setError(null)
      }, 3000)
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      const { error } = await supabase.from('members').insert([newMember])
      if (error) throw error

      setNewMember({ name: '', role: '', gender: 'male', motto: '' })
      fetchMembers()
    } catch (error) {
      console.error('Error adding member:', error)
      setError('Gagal menambahkan anggota.')
      setTimeout(() => {
        setError(null)
      }, 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteMember = async (id: number) => {
    try {
      setIsLoading(true)
      setError(null)
      const { error } = await supabase.from('members').delete().eq('id', id)
      if (error) throw error
      fetchMembers()
    } catch (error) {
      console.error('Error deleting member:', error)
      setError('Gagal menghapus anggota.')
      setTimeout(() => {
        setError(null)
      }, 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const { user } = checkSession()

  if (!user) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='flex flex-col items-center gap-2 text-green-700'>
          <Loader2 className='w-8 h-8 animate-spin' />
          <p className='text-sm font-medium'>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='p-6 bg-white rounded-lg shadow-lg mb-2'>
      <div className='flex items-center gap-2 mb-6'>
        <Users className='w-6 h-6 text-green-700' />
        <h2 className='text-2xl font-bold text-green-700'>Data Anggota BPH</h2>
        <div className='ml-auto'>
          <BackToDashboardButton />
        </div>
      </div>

      {error && (
        <div className='mb-4 p-2 bg-red-50 border border-red-200 text-red-600 rounded-lg'>
          {error}
        </div>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
        {members.map((member) => (
          <div
            key={member.id}
            className='relative p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow'
          >
            <AdminUserCard
              name={member.name}
              role={member.role}
              gender={member.gender}
              onDelete={() => deleteMember(member.id)}
            />
          </div>
        ))}
      </div>

      <div className='p-4 rounded-lg'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          <input
            type='text'
            placeholder='Nama'
            value={newMember.name}
            onChange={(e) =>
              setNewMember({ ...newMember, name: e.target.value })
            }
            className='w-full px-4 py-2 rounded-lg border border-green-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors'
          />
          <input
            type='text'
            placeholder='Role'
            value={newMember.role}
            onChange={(e) =>
              setNewMember({ ...newMember, role: e.target.value })
            }
            className='w-full px-4 py-2 rounded-lg border border-green-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors'
          />
          <input
            type='text'
            placeholder='Motto hidup'
            value={newMember.motto}
            onChange={(e) =>
              setNewMember({ ...newMember, motto: e.target.value })
            }
            className='w-full px-4 py-2 rounded-lg border border-green-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors'
          />
          <select
            value={newMember.gender}
            onChange={(e) =>
              setNewMember({
                ...newMember,
                gender: e.target.value as 'male' | 'female',
              })
            }
            className='w-full px-4 py-2 rounded-lg border border-green-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors bg-white'
          >
            <option value='male'>Laki-laki</option>
            <option value='female'>Perempuan</option>
          </select>
          <button
            onClick={addMember}
            disabled={isLoading}
            className='flex items-center justify-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <UserPlus className='w-5 h-5' />
            Tambah Anggota
          </button>
        </div>
      </div>
    </div>
  )
}
