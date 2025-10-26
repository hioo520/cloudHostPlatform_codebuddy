import React, { useState } from 'react'
import { 
  Tabs, 
  Typography, 
  Card, 
  Row, 
  Col, 
  Select,
  DatePicker,
  Table,
  Progress
} from 'antd'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const { Title } = Typography
const { Option } = Select
const { RangePicker } = DatePicker

const MultiDimensionMetrics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('host')

  // 模拟主机维度指标数据
  const mockHostMetrics = [
    {
      id: '1',
      ip: '10.20.235.142',
      sampleTime: '2025/10/20',
      cpuUsage: 20,
      memoryUsage: 30,
      diskUsage: 99,
      networkIn: 1.45,
      networkOut: 24.33,
      processCount: 200,
      taskCount: 3247,
      runningProcesses: 'wcb_a,wcb_b'
    }
  ]

  // 模拟通道维度指标数据
  const mockChannelMetrics = [
    {
      id: '1',
      channelName: 'FHBSD',
      taskType: 'LIST',
      sampleTime: '2025/10/20',
      taskCount: 1000,
      successCount: 500,
      failCount: 300,
      emptyCount: 200,
      dedupCount: 100
    }
  ]

  // 模拟业务维度指标数据
  const mockBusinessMetrics = [
    {
      id: '1',
      businessName: 'FHBSD',
      ip: '10.45.65.33',
      sampleTime: '2025/10/20',
      taskCount: 1000,
      successCount: 500,
      failCount: 300,
      emptyCount: 200,
      dedupCount: 100
    }
  ]

  // 模拟图表数据
  const chartData = [
    { time: '10:00', cpu: 20, memory: 30, disk: 99 },
    { time: '11:00', cpu: 25, memory: 35, disk: 95 },
    { time: '12:00', cpu: 30, memory: 40, disk: 92 },
    { time: '13:00', cpu: 35, memory: 45, disk: 90 },
    { time: '14:00', cpu: 40, memory: 50, disk: 88 },
  ]

  const hostColumns = [
    {
      title: '云主机IP',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: '采样时间',
      dataIndex: 'sampleTime',
      key: 'sampleTime',
    },
    {
      title: 'CPU使用率',
      dataIndex: 'cpuUsage',
      key: 'cpuUsage',
      render: (usage: number) => (
        <Progress percent={usage} size="small" />
      ),
    },
    {
      title: '内存使用率',
      dataIndex: 'memoryUsage',
      key: 'memoryUsage',
      render: (usage: number) => (
        <Progress percent={usage} size="small" />
      ),
    },
    {
      title: '磁盘使用率',
      dataIndex: 'diskUsage',
      key: 'diskUsage',
      render: (usage: number) => (
        <Progress percent={usage} size="small" status={usage > 90 ? 'exception' : 'normal'} />
      ),
    },
  ]

  const channelColumns = [
    {
      title: '通道名',
      dataIndex: 'channelName',
      key: 'channelName',
    },
    {
      title: '任务类型',
      dataIndex: 'taskType',
      key: 'taskType',
    },
    {
      title: '采样时间',
      dataIndex: 'sampleTime',
      key: 'sampleTime',
    },
    {
      title: '任务数',
      dataIndex: 'taskCount',
      key: 'taskCount',
    },
    {
      title: '成功率',
      key: 'successRate',
      render: (record: any) => {
        const rate = (record.successCount / record.taskCount) * 100
        return `${rate.toFixed(1)}%`
      },
    },
  ]

  const businessColumns = [
    {
      title: '业务名',
      dataIndex: 'businessName',
      key: 'businessName',
    },
    {
      title: '云主机IP',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: '采样时间',
      dataIndex: 'sampleTime',
      key: 'sampleTime',
    },
    {
      title: '任务数',
      dataIndex: 'taskCount',
      key: 'taskCount',
    },
    {
      title: '成功率',
      key: 'successRate',
      render: (record: any) => {
        const rate = (record.successCount / record.taskCount) * 100
        return `${rate.toFixed(1)}%`
      },
    },
  ]

  const tabItems = [
    {
      key: 'host',
      label: '云主机维度',
      children: (
        <div>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={8}>
              <Select placeholder="选择云主机" style={{ width: '100%' }}>
                <Option value="10.20.235.142">10.20.235.142</Option>
                <Option value="10.45.65.33">10.45.65.33</Option>
              </Select>
            </Col>
            <Col span={8}>
              <RangePicker style={{ width: '100%' }} />
            </Col>
            <Col span={8}>
              <Select placeholder="选择指标" style={{ width: '100%' }}>
                <Option value="cpu">CPU使用率</Option>
                <Option value="memory">内存使用率</Option>
                <Option value="disk">磁盘使用率</Option>
              </Select>
            </Col>
          </Row>
          
          <Card title="资源使用趋势" style={{ marginBottom: 16 }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cpu" stroke="#1890ff" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="memory" stroke="#52c41a" />
                <Line type="monotone" dataKey="disk" stroke="#faad14" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
          
          <Card title="详细指标数据">
            <Table
              columns={hostColumns}
              dataSource={mockHostMetrics}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </div>
      ),
    },
    {
      key: 'channel',
      label: '通道维度',
      children: (
        <div>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={8}>
              <Select placeholder="选择通道" style={{ width: '100%' }}>
                <Option value="FHBSD">FHBSD</Option>
              </Select>
            </Col>
            <Col span={8}>
              <RangePicker style={{ width: '100%' }} />
            </Col>
            <Col span={8}>
              <Select placeholder="选择任务类型" style={{ width: '100%' }}>
                <Option value="LIST">LIST</Option>
                <Option value="DATA">DATA</Option>
                <Option value="DETAIL">DETAIL</Option>
              </Select>
            </Col>
          </Row>
          
          <Card title="通道指标数据">
            <Table
              columns={channelColumns}
              dataSource={mockChannelMetrics}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </div>
      ),
    },
    {
      key: 'business',
      label: '业务维度',
      children: (
        <div>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={8}>
              <Select placeholder="选择业务" style={{ width: '100%' }}>
                <Option value="FHBSD">FHBSD</Option>
              </Select>
            </Col>
            <Col span={8}>
              <RangePicker style={{ width: '100%' }} />
            </Col>
            <Col span={8}>
              <Select placeholder="选择云主机" style={{ width: '100%' }}>
                <Option value="10.45.65.33">10.45.65.33</Option>
              </Select>
            </Col>
          </Row>
          
          <Card title="业务指标数据">
            <Table
              columns={businessColumns}
              dataSource={mockBusinessMetrics}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className="page-header">
        <Title level={2}>多维度指标管理</Title>
        <p>从不同维度查看和分析云主机及业务指标</p>
      </div>

      <Card>
        <Tabs
          activeKey={activeTab}
          items={tabItems}
          onChange={setActiveTab}
        />
      </Card>
    </div>
  )
}

export default MultiDimensionMetrics