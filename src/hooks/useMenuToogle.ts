import { useState, useEffect } from 'react'

export const useMenuToggle = (
  initialState = false,
): [boolean, (value: boolean) => void] => {
  const [menuOpen, setMenuOpen] = useState(initialState)

  useEffect(() => {
    const handleCloseMenu = () => {
      if (menuOpen) setMenuOpen(false) // Hanya tutup menu jika sedang terbuka
    }

    // Menambahkan event listener untuk scroll dan klik
    window.addEventListener('scroll', handleCloseMenu)
    window.addEventListener('click', handleCloseMenu)

    // Cleanup event listener saat komponen unmount
    return () => {
      window.removeEventListener('scroll', handleCloseMenu)
      window.removeEventListener('click', handleCloseMenu)
    }
  }, [menuOpen])

  return [menuOpen, setMenuOpen]
}
