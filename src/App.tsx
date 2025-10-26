import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import Header from './components/Layout/Header'
import Sidebar from './components/Layout/Sidebar'
import Dashboard from './pages/Dashboard'
import CloudHostManagement from './pages/CloudHostManagement'
import ChangeManagement from './pages/ChangeManagement'
import InefficientHosts from './pages/InefficientHosts'
import PublicPoolManagement from './pages/PublicPoolManagement'
import MultiDimensionMetrics from './pages/MultiDimensionMetrics'

const { Content } = Layout

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Layout>
        <Sidebar />
        <Content style={{ margin: '16px', overflow: 'initial' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cloud-hosts" element={<CloudHostManagement />} />
            <Route path="/change-management" element={<ChangeManagement />} />
            <Route path="/inefficient-hosts" element={<InefficientHosts />} />
            <Route path="/public-pool" element={<PublicPoolManagement />} />
            <Route path="/metrics" element={<MultiDimensionMetrics />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App