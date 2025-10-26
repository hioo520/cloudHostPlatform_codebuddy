import React from 'react'
import { Layout, Typography, Space, Avatar, Dropdown, Badge } from 'antd'
import { BellOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'

const { Header: AntHeader } = Layout
const { Title } = Typography

const Header: React.FC = () => {
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ]

  return (
    <AntHeader style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '0 24px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Title level={3} style={{ color: 'white', margin: 0, marginRight: '20px' }}>
          云主机管理平台
        </Title>
      </div>
      
      <Space size="large">
        <Badge count={5} size="small">
          <BellOutlined style={{ color: 'white', fontSize: '18px', cursor: 'pointer' }} />
        </Badge>
        
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <Space style={{ cursor: 'pointer' }}>
            <Avatar size="small" icon={<UserOutlined />} />
            <span style={{ color: 'white' }}>管理员</span>
          </Space>
        </Dropdown>
      </Space>
    </AntHeader>
  )
}

export default Header