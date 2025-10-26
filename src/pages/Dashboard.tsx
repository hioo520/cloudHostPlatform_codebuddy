import React, { useEffect } from 'react'
import { Row, Col, Card, Statistic, Progress, Typography } from 'antd'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setStats } from '../store/slices/dashboardSlice'
import { CloudServerOutlined, TeamOutlined, WindowsOutlined, LinuxOutlined, WarningOutlined } from '@ant-design/icons'

const { Title } = Typography

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch()
  const { stats } = useAppSelector((state) => state.dashboard)

  useEffect(() => {
    // 模拟数据加载
    dispatch(setStats({
      totalHosts: 156,
      publicPoolHosts: 23,
      windowsHosts: 89,
      linuxHosts: 67,
      onlineHosts: 148,
      cpuUsage: 65,
      memoryUsage: 72,
      diskUsage: 58,
      abnormalHosts: 8,
    }))
  }, [dispatch])

  const getProgressStatus = (percent: number) => {
    if (percent < 70) return 'success'
    if (percent < 85) return 'normal'
    return 'exception'
  }

  return (
    <div>
      <div className="page-header">
        <Title level={2}>云主机管理平台</Title>
        <p>实时监控云主机资源使用情况和系统状态</p>
      </div>

      {/* 关键指标统计 */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} md={6}>
          <Card className="stat-card">
            <Statistic
              title="云主机总数"
              value={stats.totalHosts}
              prefix={<CloudServerOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stat-card">
            <Statistic
              title="公共池主机"
              value={stats.publicPoolHosts}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stat-card">
            <Statistic
              title="Windows主机"
              value={stats.windowsHosts}
              prefix={<WindowsOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stat-card">
            <Statistic
              title="Linux主机"
              value={stats.linuxHosts}
              prefix={<LinuxOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 资源使用情况 */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} md={8}>
          <Card title="CPU使用率" className="stat-card">
            <Progress
              type="circle"
              percent={stats.cpuUsage}
              status={getProgressStatus(stats.cpuUsage)}
              format={percent => `${percent}%`}
              width={80}
            />
            <div style={{ marginTop: '16px' }}>
              <p>平均使用率: {stats.cpuUsage}%</p>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="内存使用率" className="stat-card">
            <Progress
              type="circle"
              percent={stats.memoryUsage}
              status={getProgressStatus(stats.memoryUsage)}
              format={percent => `${percent}%`}
              width={80}
            />
            <div style={{ marginTop: '16px' }}>
              <p>平均使用率: {stats.memoryUsage}%</p>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="磁盘使用率" className="stat-card">
            <Progress
              type="circle"
              percent={stats.diskUsage}
              status={getProgressStatus(stats.diskUsage)}
              format={percent => `${percent}%`}
              width={80}
            />
            <div style={{ marginTop: '16px' }}>
              <p>平均使用率: {stats.diskUsage}%</p>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 异常状态 */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card 
            title="异常监控" 
            className="stat-card"
            extra={<WarningOutlined style={{ color: '#ff4d4f' }} />}
          >
            <Row gutter={[16, 16]}>
              <Col xs={12} sm={6}>
                <Statistic
                  title="异常主机数"
                  value={stats.abnormalHosts}
                  valueStyle={{ color: '#ff4d4f' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title="在线主机数"
                  value={stats.onlineHosts}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title="离线主机数"
                  value={stats.totalHosts - stats.onlineHosts}
                  valueStyle={{ color: '#faad14' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title="在线率"
                  value={((stats.onlineHosts / stats.totalHosts) * 100).toFixed(1)}
                  suffix="%"
                  valueStyle={{ color: '#1890ff' }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard