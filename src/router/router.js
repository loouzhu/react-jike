import Layout from '../pages/Layout/index.jsx'
import Login from '../pages/Login/index.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { AuthRoute } from '@/components/AuthRoute'
import { Navigate } from 'react-router-dom'
import Home from '@/pages/Layout/Home/home.jsx'
import Manage from '@/pages/Layout/Manage/manage.jsx'
import Publish from '@/pages/Layout/Publish/publish.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute><Layout /></AuthRoute>,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" replace />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/manage',
        element: <Manage />
      },
      {
        path: '/publish',
        element: <Publish />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])

export default router