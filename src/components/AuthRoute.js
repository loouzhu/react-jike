// 有token就正常跳转，没有就去登陆页面

import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'

export function AuthRoute({ children }) {
  const token = getToken()
  if (token) {
    return <>{children}</>
  }
  else {
    return <Navigate to={'/login'} replace />
  }
}