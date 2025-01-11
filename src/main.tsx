import './index.css'
import PageNotFound from './components/PageNotFound'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/Homepage'
import { MainLayout } from './MainLayout'
import Members from './pages/Member'
import { Suggestion } from './pages/Suggestion'
import LoginPage from './pages/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'members',
        element: <Members />,
      },
      {
        path: 'suggestion',
        element: <Suggestion />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
    errorElement: <PageNotFound />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
