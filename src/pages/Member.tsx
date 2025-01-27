import { useEffect, useState } from 'react'
import { BackButton } from '../components/Button/BackButton/BackButton'
import { CardMember } from '../components/CardMember'
import { Footer } from '../components/Footer'
import { supabase } from '../lib/supabase'
import { Member } from '../components/Admin/AdminMemberList'

export const Members = () => {
  const [members, setMembers] = useState<Member[]>([])
  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase.from('members').select('*')
      if (error) throw error
      setMembers(data || [])
    } catch (error) {
      console.error('Error fetching members:', error)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-b from-green-700 to-green-500'>
      {/* Header */}
      <div className='py-12 text-white text-center'>
        <div className='mb-6'>
          <h1 className='text-5xl font-extrabold tracking-tight mb-4'>
            Struktur Organisasi
          </h1>
          <p className='text-xl opacity-90'>
            OSIS MA NURUL HUDA Periode 2024/2025
          </p>
        </div>
      </div>

      {/* Cards Container */}
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
          {members.map((member, index) => (
            <CardMember
              motto={member.motto}
              name={member.name}
              gender={member.gender}
              role={member.role}
              key={index}
            />
          ))}
        </div>
      </div>
      <BackButton />
      <Footer />
    </div>
  )
}
