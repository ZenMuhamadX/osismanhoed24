import { Quote } from 'lucide-react'
import { BackButton } from '../components/BackButton'

// Data Array Member
const members = [
  {
    photo: 'male.png',
    name: 'Ahmad Ripani',
    position: 'Ketua OSIS',
    motto: 'Jika orang lain bisa,maka saya juga bisa.',
  },
  {
    photo: 'female.png',
    name: 'Ruba Fajria Restu',
    position: 'Wakil Ketua OSIS',
    motto: 'Cara untuk memperbaiki masa depan adalah dengan menciptakannya',
  },
  {
    photo: 'male.png',
    name: 'Candra Juliana',
    position: 'Sekertaris I',
    motto: 'Tidur lebih baik daripada mengkhawatirkan takdir',
  },  {
    photo: 'female.png',
    name: 'Sulistiani khofifah',
    position: 'Sekertaris II',
    motto: 'Yakin pada diri sendiri adalah kunci',
  },  {
    photo: 'female.png',
    name: 'Emma siti maesaroh',
    position: 'Bendahara I',
    motto: 'Jadilah versi terbaik dari dirimu setiap hari',
  },  {
    photo: 'male.png',
    name: 'M.Rizky Al Mubarok',
    position: 'Bendahara II',
    motto: 'Jadilah cahaya dalam kegelapan',
  },
]

const Members = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-700 to-green-400">
      {/* Header */}
      <div className="py-12 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Struktur Organisasi</h1>
        <p className="text-xl opacity-90">OSIS MA NURUL HUDA Periode 2024/2025</p>
      </div>

      {/* Cards Container */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {members.map((member, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              {/* Photo */}
              <div className="relative h-48 overflow-hidden bg-green-100">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-600/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <h3 className="font-bold text-lg leading-tight">{member.name}</h3>
                  <p className="text-sm opacity-90">{member.position}</p>
                </div>
              </div>

              {/* Motto */}
              <div className="p-4">
                <div className="flex items-start gap-2">
                  <Quote className="h-4 w-4 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-sm text-gray-600 italic">
                    "{member.motto}"
                  </p>
                </div>
              </div>

              {/* Subtle decorative element */}
              <div className="h-1 bg-gradient-to-r from-green-400 to-green-600" />
            </div>
          ))}
        </div>
      </div>
      <BackButton/>
    </div>
  )
}

export default Members
