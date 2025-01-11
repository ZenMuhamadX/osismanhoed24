import { ArrowRight, Calendar, Target, List } from 'lucide-react'
import Footer from '../components/Footer'

const proker = [
  {
    proker: 'Menyelenggarakan PHB dan PHBN',
  },
  {
    proker: 'Mengadakan kumpulan rutin',
  },
  {
    proker: 'Membuat hikmah hari ini',
  },
  {
    proker: 'Classmeeting',
  },
  {
    proker: 'Mengadakan ceram seram dan Gema Ramadhan',
  },
  {
    proker: 'budaya 5S ( Senyum sapa salam sopan santun )',
  },
  {
    proker: 'Kotak aspirasi/saran',
  },
  {
    proker: 'Senam pagi',
  },
  {
    proker: 'Menghidupkan kembali mading',
  },
]

const Homepage = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Main Content - Using the same green gradient */}
      <div className='bg-gradient-to-b from-green-700 to-green-500 py-12'>
        <div className='container mx-auto px-4'>
          {/* Welcome Text */}
          <div className='text-white text-center mb-12'>
            <h2 className='text-3xl font-bold mb-4'>
              OSIS MADRASAH ALIYAH NURUL HUDA
            </h2>
            <p className='text-lg'>
              Selamat datang di Website OSIS MA Nurul Huda. Website ini
              berisikan informasi tentang kegiatan OSIS Masa Bhakti 2024/2025.
              Wadah pembinaan siswa yang bertujuan meningkatkan kreativitas dan
              prestasi.
            </p>
          </div>

          {/* Visi Misi Section */}
          <div className='grid md:grid-cols-2 gap-8 mb-12'>
            <div className='bg-white/90 p-6 rounded-lg shadow-md backdrop-blur-sm'>
              <div className='mb-4'>
                <h2 className='text-xl font-semibold flex items-center gap-2 text-green-700'>
                  <Target className='h-5 w-5' />
                  Visi
                </h2>
              </div>
              <div>
                <p className='text-gray-600'>
                  Menjadi OSIS yang inspiratif aktif dan kreatif dalam
                  meningkatkan kualitas siswa, serta menciptakan lingkungan
                  sekolah yang harmonis, disiplin, dan penuh semangat belajar
                </p>
              </div>
            </div>

            <div className='bg-white/90 p-6 rounded-lg shadow-md backdrop-blur-sm'>
              <div className='mb-4'>
                <h2 className='text-xl font-semibold flex items-center gap-2 text-green-700'>
                  <List className='h-5 w-5' />
                  Misi
                </h2>
              </div>
              <div>
                <ul className='list-disc pl-4 text-gray-600 space-y-2'>
                  <li>
                    Mengembangkan dan meksanakan program serta kegiatan yang
                    relevan dan bermanfaat bagi seluruh warga sekolah dan
                    masyarakat sekitar
                  </li>
                  <li>
                    berfokus terhadap kebutuhan den aspirasi serta membangun
                    kemajuan Organisasi Membangun eksistensi organisasi yang
                    unggul dan berkualitas sekaligus meningkatkan nilai OSIS
                    MANHUD dengan memperkuat relasi kepada khalayak eksternal
                    melalui kegiatan kolaborasi, kemitraan, maupun
                    keorganisasian luar madrasah
                  </li>
                  <li>
                    Mendorong siswa siswi di malinda untuk menanamkan sikap
                    religius dan berakhlak mulia
                  </li>
                  <li>
                    Menjaga komunikasi yang baik dan juga terbuka dengan seluruh
                    warga sekolah dan mendengarkan aspirasi mereka
                  </li>
                  <li>Mengoptimalkan potensi akademik dan non-akademik</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Program Kerja Section */}
          <div className='bg-white/90 p-6 rounded-lg shadow-md mb-12 backdrop-blur-sm'>
            <div className='mb-6'>
              <h2 className='text-xl font-semibold flex items-center gap-2 text-green-700'>
                <Calendar className='h-5 w-5' />
                Program Kerja
              </h2>
            </div>
            <div className='grid md:grid-cols-3 gap-6'>
              {proker.map((proker, i) => (
                <div key={i} className='p-4 border rounded-lg bg-green-50'>
                  <h3 className='font-semibold mb-2 text-green-700'>
                    Program {i + 1}
                  </h3>
                  <p className='text-gray-600 text-sm'>{proker.proker}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Members Button */}
          <div className='text-center'>
            <button
              className='bg-white text-green-600 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto hover:bg-green-50 transition-colors'
              onClick={() => (window.location.href = '/members')}
            >
              Lihat Struktur Organisasi
              <ArrowRight className='h-4 w-4' />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Homepage
