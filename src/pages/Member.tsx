import Card from '../components/Card' // Pastikan komponen Card sudah dibuat

// Data Array Member
const members = [
  {
    photo: 'https://via.placeholder.com/300',
    name: 'Zen',
    position: 'Ketua OSIS',
    motto: 'Jadilah cahaya dalam kegelapan.',
  },
  {
    photo: 'https://via.placeholder.com/300',
    name: 'Fulan',
    position: 'Wakil Ketua OSIS',
    motto: 'Hidup adalah perjuangan.',
  },
  {
    photo: 'https://via.placeholder.com/300',
    name: 'Fulanah',
    position: 'Sekretaris',
    motto: 'Kerja keras tidak akan mengkhianati.',
  },
  {
    photo: 'https://via.placeholder.com/300',
    name: 'Ali',
    position: 'Bendahara',
    motto: 'Tabungan kecil membuat mimpi besar.',
  },
  {
    photo: 'https://via.placeholder.com/300',
    name: 'Aisyah',
    position: 'Anggota OSIS',
    motto: 'Selalu lakukan yang terbaik.',
  },
]

const Members = () => {
  return (
    <div className='min-h-screen bg-gray-100 py-10'>
      <h1 className='text-2xl font-bold text-center'>Struktur Organisasi</h1>
      <p className='text-md font-mono mb-8 text-center'>
        Masa Bhakti 2024-2025
      </p>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-6'>
          {members.map((member, index) => (
            <Card
              key={index}
              photo={member.photo}
              name={member.name}
              position={member.position}
              motto={member.motto}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Members
