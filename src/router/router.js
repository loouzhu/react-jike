import Layout from '../pages/Layout/index.jsx'
import Login from '../pages/Login/index.jsx'
import { createHashRouter } from 'react-router-dom'
import { AuthRoute } from '@/components/AuthRoute'
import { Navigate } from 'react-router-dom'
import Home from '@/pages/Layout/Home/home.jsx'
import Artical from '@/pages/Layout/Artical/artical.jsx'
import Publish from '@/pages/Layout/Publish/publish.jsx'

const router = createHashRouter([
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
        path: '/artical',
        element: <Artical />
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