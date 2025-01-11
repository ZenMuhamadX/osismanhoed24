import { FC, useEffect, useState } from 'react'
import { UserCard } from './UserCard'
import { supabase } from '../../lib/supabase'
import { UserPlus, Trash2, Users } from 'lucide-react'

interface Member {
  id: number
  name: string
  role: string
  gender: 'male' | 'female'
}

export const MemberList: FC = () => {
  const [members, setMembers] = useState<Member[]>([])
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    gender: 'male' as 'male' | 'female',
  })
  const [isLoading, setIsLoading] = useState(false)

  const fetchMembers = async () => {
    try {
      setIsLoading(true)
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
      alert('Nama dan Role harus diisi!')
      return
    }

    try {
      setIsLoading(true)
      const { error } = await supabase.from('members').insert([newMember])
      if (error) throw error

      setNewMember({ name: '', role: '', gender: 'male' })
      fetchMembers()
    } catch (error) {
      console.error('Error adding member:', error)
      alert('Gagal menambahkan anggota.')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteMember = async (id: number) => {
    try {
      setIsLoading(true)
      const { error } = await supabase.from('members').delete().eq('id', id)
      if (error) throw error
      fetchMembers()
    } catch (error) {
      console.error('Error deleting member:', error)
      alert('Gagal menghapus anggota.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='p-6 bg-white rounded-lg shadow-lg mb-2'>
      <div className='flex items-center gap-2 mb-6'>
        <Users className='w-6 h-6 text-green-700' />
        <h2 className='text-2xl font-bold text-green-700'>Data Anggota BPH</h2>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
        {members.map((member) => (
          <div
            key={member.id}
            className='relative p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow'
          >
            <button
              onClick={() => deleteMember(member.id)}
              className='absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors'
              disabled={isLoading}
            >
              <Trash2 className='w-5 h-5' />
            </button>
            <UserCard
              name={member.name}
              role={member.role}
              //   gender={member.gender}
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
