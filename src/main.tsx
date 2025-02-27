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

import { AdminAccountManage } from './components/Admin/AdminAccountManage'
import { ChangePassword } from './components/Admin/pages/ChangePassword'
import { ChangeDisplayName } from './components/Admin/pages/ChangeDisplayName'
import { AdminLastLogin } from './components/Admin/pages/AdminLastLogin'
import { ChangeAvatar } from './components/Admin/pages/ChangeAvatar'

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
