import Layout from '../pages/Layout/index.jsx'
import Login from '../pages/Login/index.jsx'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{}]
  },
  {
    path: '/login',
    element: <Login />
  }
])

export default router