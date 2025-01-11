import { FaInstagram, FaWhatsapp, FaEnvelope, FaYoutube } from 'react-icons/fa' // Ikon sosial media

const year = new Date().getFullYear()

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white py-12'>
      <div className='container mx-auto px-5 -py-10'>
        {/* Bagian Logo dan Nama */}
        <div className='flex items-center justify-start mb-9'>
          <img src='OSIS.png' alt='MANHOED' className='h-16 mr-4' />{' '}
          {/* Ganti dengan logo Anda */}
          <div className='items-center text-left px-5'>
            <h2 className='text-2xl font-semibold'>OSIS MA NURUL HUDA</h2>
            <p className='text-sm text-gray-400'>
              Organisasi Siswa Intra Sekolah Madrasah Aliyah Nurul Huda Kawali
            </p>
          </div>
        </div>

        {/* Sosial Media */}
        <div className='mb-6'>
          <h3 className='text-md font-semibold mb-2'>Sosial Media</h3>
          <div className='flex items-center space-x-4'>
            <a
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center space-x-2 hover:text-gray-400'
            >
              <FaInstagram size={24} />
              <span className='font-normal text-sm text-gray-400'>
                Instagram
              </span>
            </a>
          </div>
          <div className='flex items-center mt-2 space-x-4'>
            <a
              href='https://youtube.com/@manurulhudakawali'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center space-x-2 hover:text-gray-400'
            >
              <FaYoutube size={24} />
              <span className='font-normal text-sm text-gray-400'>Youtube</span>
            </a>
          </div>
        </div>

        {/* Alamat */}
        <div className='mb-6'>
          <h3 className='text-md font-semibold mb-2'>Alamat</h3>
          <a
            href='https://maps.app.goo.gl/xgL7UPoTUCzVogUX6'
            target='_blank'
            rel='noopener noreferrer'
            className='flex space-x-2 hover:text-gray-400'
          >
            <span className='font-normal text-sm text-gray-400'>
              {' '}
              Jalan raya kawali-panjalu Margamulya Kawali, Margamulya, Ciamis,
              Kabupaten Ciamis, Jawa Barat Indonesia 46253
            </span>
          </a>
        </div>

        {/* Email dan WhatsApp */}
        <div className='flex justify-between items-center'>
          <div className='text-center'>
            <a
              href='mailto:osismanurulhuda2223@gmail.com'
              className='flex justify-center items-center space-x-2 text-lg font-semibold hover:text-gray-400'
            >
              <FaEnvelope size={20} />
              <p className='text-sm'>Email Kami</p>
            </a>
          </div>
          <div className='text-center'>
            <a
              href='https://wa.me/082129052600'
              target='_blank'
              rel='noopener noreferrer'
              className='flex justify-center items-center space-x-2 text-lg font-semibold hover:text-gray-400'
            >
              <FaWhatsapp size={20} />
              <p className='text-sm'>+62 821-2905-2600</p>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className='text-center text-sm text-gray-400 mt-10'>
          <p>&copy; {year} OSIS MA NURUL HUDA KAWALI. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
