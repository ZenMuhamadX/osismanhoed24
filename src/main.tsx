import './index.css'
import PageNotFound from './components/notFound/PageNotFound'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/Homepage'
import { MainLayout } from './MainLayout'
import Members from './pages/Member'
import { Suggestion } from './pages/Suggestion'
import LoginPage from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { MemberList } from './components/admin/MemberList'
import { ProgramList } from './components/admin/ProgramList'
import { SuggestionList } from './components/admin/SuggestionList'

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
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: '/dashboard/members',
        element: <MemberList />,
      },
      {
        path: '/dashboard/programs',
        element: <ProgramList />,
      },
      {
        path: '/dashboard/suggestions',
        element: <SuggestionList />,
      },
    ],
    errorElement: <PageNotFound />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
