import './index.css'
import PageNotFound from './components/PageNotFound'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Contact from './pages/Contact'
import About from './pages/About'
import Home from './pages/Home'
import { MainLayout } from './MainLayout'
import Footer from './components/Footer'
import Members from './pages/Member'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'member',
        element: <Members />,
      },
    ],
    errorElement: <PageNotFound />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Footer />
  </StrictMode>
)
