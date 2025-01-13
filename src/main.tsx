import './index.css'
import { PageNotFound } from './components/NotFound/PageNotFound'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Homepage } from './pages/Homepage'
import { App } from './App'
import { Members } from './pages/Member'
import { Suggestion } from './pages/Suggestion'
import { LoginPage } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { AdminMemberList } from './components/Admin/AdminMemberList'
import { AdminProgramList } from './components/Admin/AdminProgramList'
import { AdminSuggestionList } from './components/Admin/AdminSuggestionList'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Homepage />,
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
        element: <AdminMemberList />,
      },
      {
        path: '/dashboard/programs',
        element: <AdminProgramList />,
      },
      {
        path: '/dashboard/suggestions',
        element: <AdminSuggestionList />,
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
