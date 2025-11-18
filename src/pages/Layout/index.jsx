import { Layout, Menu, Popconfirm } from 'antd'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import './index.scss'
import { fetchUserInfo, setUserInfo, setToken } from '@/features/jikeSlice'

const { Header, Sider } = Layout

const items = [
  {
    label: '首页',
    icon: <HomeOutlined />,
    key: '/home'
  },
  {
    label: '文章管理',
    icon: <DiffOutlined />,
    key: '/manage'
  },
  {
    label: '创建文章',
    icon: <EditOutlined />,
    key: '/publish'
  },
]

const GeekLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const handleOnclick = ({ key }) => {
    navigate(key)
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">
            {useSelector(state => state.jike.userInfo.name)}
          </span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={() => {
                dispatch(setToken(''))
                dispatch(setUserInfo({}))
                navigate('/login')
              }}
            >
              <LogoutOutlined />
              退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['/home']}
            items={items}
            selectedKeys={[location.pathname]}
            onClick={handleOnclick}
            style={{ height: '100%', borderRight: 0 }}>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout