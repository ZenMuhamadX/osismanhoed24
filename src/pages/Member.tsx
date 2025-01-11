import { BackButton } from '../components/button/BackButton'
import Card from '../components/Card'
import Footer from '../components/Footer'

// Data Array Member
const members = [
  {
    photo: 'male.png',
    name: 'Ahmad Ripani',
    position: 'Ketua OSIS',
    motto: 'Jika orang lain bisa,maka saya juga bisa',
  },
  {
    photo: 'female.png',
    name: 'Ruba Fajria Restu',
    position: 'Wakil Ketua OSIS',
    motto: 'perbaiki masa depan dengan menciptakannya',
  },
  {
    photo: 'male.png',
    name: 'Candra Juliana',
    position: 'Sekertaris I',
    motto: 'Tidur lebih baik daripada mengkhawatirkan takdir',
  },
  {
    photo: 'female.png',
    name: 'Sulistiani khofifah',
    position: 'Sekertaris II',
    motto: 'Yakin pada diri sendiri adalah kunci untuk mencapai apapun',
  },
  {
    photo: 'female.png',
    name: 'Emma siti maesaroh',
    position: 'Bendahara I',
    motto: 'Jadilah versi terbaik dari dirimu setiap hari',
  },
  {
    photo: 'male.png',
    name: 'M.Rizky Al Mubarok',
    position: 'Bendahara II',
    motto: 'Manusia adalah apa yang ia pikirkan sepanjang hari',
  },
]

const Members = () => {
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
            <Card
              motto={member.motto}
              name={member.name}
              photo={member.photo}
              position={member.position}
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

export default Members
