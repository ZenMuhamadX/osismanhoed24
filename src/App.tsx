import { Outlet, useNavigation } from 'react-router-dom'
import { Header } from './components/Header'

export const App = () => {
  const navigation = useNavigation()

  return (
    <div className='relative'>
      {/* Loading spinner overlay */}
      {navigation.state === 'loading' && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin'></div>
        </div>
      )}

      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
