import React from 'react'
import { Layout, Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  DashboardOutlined,
  CloudServerOutlined,
  SyncOutlined,
  ExclamationCircleOutlined,
  TeamOutlined,
  BarChartOutlined,
} from '@ant-design/icons'

const { Sider } = Layout

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: '首页仪表盘',
    },
    {
      key: '/cloud-hosts',
      icon: <CloudServerOutlined />,
      label: '云主机管理',
    },
    {
      key: '/change-management',
      icon: <SyncOutlined />,
      label: '变更管理',
    },
    {
      key: '/inefficient-hosts',
      icon: <ExclamationCircleOutlined />,
      label: '低效云主机',
    },
    {
      key: '/public-pool',
      icon: <TeamOutlined />,
      label: '公共池管理',
    },
    {
      key: '/metrics',
      icon: <BarChartOutlined />,
      label: '多维度指标',
    },
  ]

  return (
    <Sider 
      width={200} 
      style={{ 
        background: '#fff',
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        style={{ height: '100%', borderRight: 0, paddingTop: '16px' }}
      />
    </Sider>
  )
}

export default Sidebar