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
import { AdminProgramList } from './components/Admin/AdminProgramList'
import { AdminSuggestionList } from './components/Admin/AdminSuggestionList'
import { ChangePassword } from './pages/Admin/ChangePassword'
import { ChangeDisplayName } from './pages/Admin/ChangeDisplayName'
import { ChangeAvatar } from './pages/Admin/ChangeAvatar'
import { AdminMemberList } from './components/Admin/AdminMemberList'
import { AdminAccountManage } from './pages/Admin/AdminAccountManage'
import { AdminLastLogin } from './pages/Admin/AdminLastLogin'

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
        path: '/members',
        element: <Members />,
      },
      {
        path: '/suggestion',
        element: <Suggestion />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/dashboard',
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
      {
        path: '/dashboard/account',
        element: <AdminAccountManage />,
      },
      {
        path: '/dashboard/account/change_password',
        element: <ChangePassword />,
      },
      {
        path: 'dashboard/account/change_display_name',
        element: <ChangeDisplayName />,
      },
      {
        path: '/dashboard/account/last_login',
        element: <AdminLastLogin />,
      },
      {
        path: '/dashboard/account/avatars',
        element: <ChangeAvatar />,
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
