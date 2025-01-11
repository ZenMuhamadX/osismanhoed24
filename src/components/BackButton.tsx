export const BackButton = () => {
  return (
    <div className='container mx-auto px-4 py-8 text-center'>
      <button
        onClick={() => (window.location.href = '/')}
        className='bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors'
      >
        Kembali ke Beranda
      </button>
    </div>
  )
}
