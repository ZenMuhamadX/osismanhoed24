import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className='relative min-h-screen bg-gradient-to-br from-green-400 to-green-600 text-white flex flex-col overflow-hidden'>
      {/* Header */}
      <header className='pt-16 px-6 text-center'>
        <h1 className='text-4xl font-bold mb-4'>
          OSIS MADRASAH ALIYAH NURUL HUDA
        </h1>
        <p className='text-lg leading-relaxed max-w-2xl mx-auto'>
          Selamat datang di Website OSIS MA Nurul Huda. Website ini berisikan
          informasi tentang kegiatan OSIS Masa Bhakti 2024/2025. Wadah pembinaan
          siswa yang bertujuan meningkatkan kreativitas dan prestasi.
        </p>
        <button
          onClick={() => navigate('/member')}
          className='mt-8 bg-white text-green-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-green-100 transition'
        >
          Lihat Anggota
        </button>
      </header>

      {/* Gambar Dekoratif */}
      <div className='flex justify-center mt-16'>
        <img
          src='https://via.placeholder.com/300.png?text=Ilustrasi+OSIS'
          alt='Ilustrasi OSIS'
          className='w-64 h-auto rounded-lg shadow-lg'
        />
      </div>

      {/* Pola Wave */}
      <div className='absolute bottom-0 w-full'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1440 320'
          className='w-full h-auto'
        >
          <path
            fill='#ffffff'
            fillOpacity='1'
            d='M0,224L48,208C96,192,192,160,288,149.3C384,139,480,149,576,154.7C672,160,768,160,864,176C960,192,1056,224,1152,213.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
          ></path>
        </svg>
      </div>
    </div>
  )
}

export default Home
