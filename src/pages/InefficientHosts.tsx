import React from 'react'
import { 
  Table, 
  Typography, 
  Card, 
  Form, 
  Input, 
  Select, 
  DatePicker,
  Progress,
  Tag,
  Row,
  Col,
  Space,
  Button
} from 'antd'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons'

const { Title } = Typography
const { RangePicker } = DatePicker
const { Option } = Select

const InefficientHosts: React.FC = () => {
  const [form] = Form.useForm()

  const mockInefficientData = [
    {
      id: '1',
      ip: '10.20.235.142',
      sampleTime: '2025/10/20',
      cpuUsageWeek: 20,
      memoryUsageWeek: 30,
      diskUsageWeek: 99,
      networkInWeek: 1.45,
      networkOutWeek: 24.33,
      cpuUsageMonth: 18,
      memoryUsageMonth: 28,
      diskUsageMonth: 98,
      networkInMonth: 1.32,
      networkOutMonth: 22.15
    }
  ]

  const getUsageLevel = (usage: number) => {
    if (usage < 30) return { color: '#52c41a', status: 'low' }
    if (usage < 70) return { color: '#faad14', status: 'medium' }
    return { color: '#ff4d4f', status: 'high' }
  }

  const columns = [
    {
      title: '云主机IP',
      dataIndex: 'ip',
      key: 'ip',
      width: 120,
    },
    {
      title: '采样时间',
      dataIndex: 'sampleTime',
      key: 'sampleTime',
      width: 120,
    },
    {
      title: 'CPU使用率(周)',
      dataIndex: 'cpuUsageWeek',
      key: 'cpuUsageWeek',
      render: (usage: number) => {
        const { color } = getUsageLevel(usage)
        return (
          <Space>
            <Progress 
              percent={usage} 
              size="small" 
              strokeColor={color}
              format={percent => `${percent}%`}
            />
            {usage < 30 && <Tag color="red">低效</Tag>}
          </Space>
        )
      },
      width: 150,
    },
    {
      title: '内存使用率(周)',
      dataIndex: 'memoryUsageWeek',
      key: 'memoryUsageWeek',
      render: (usage: number) => {
        const { color } = getUsageLevel(usage)
        return (
          <Progress 
            percent={usage} 
            size="small" 
            strokeColor={color}
            format={percent => `${percent}%`}
          />
        )
      },
      width: 150,
    },
    {
      title: '磁盘使用率(周)',
      dataIndex: 'diskUsageWeek',
      key: 'diskUsageWeek',
      render: (usage: number) => {
        const { color } = getUsageLevel(usage)
        return (
          <Space>
            <Progress 
              percent={usage} 
              size="small" 
              strokeColor={color}
              format={percent => `${percent}%`}
            />
            {usage > 90 && <Tag color="red">告警</Tag>}
          </Space>
        )
      },
      width: 150,
    },
    {
      title: '网络写入(周)',
      dataIndex: 'networkOutWeek',
      key: 'networkOutWeek',
      render: (value: number) => `${value} MB/s`,
      width: 120,
    },
  ]

  return (
    <div>
      <div className="page-header">
        <Title level={2}>低效云主机</Title>
        <p>监控和识别资源使用效率较低的云主机</p>
      </div>

      <Card className="search-form">
        <Form
          form={form}
          layout="inline"
        >
          <Row gutter={[16, 16]} style={{ width: '100%' }}>
            <Col xs={24} sm={12} md={6}>
              <Form.Item name="ip" label="IP地址">
                <Input placeholder="请输入IP地址" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item name="timeRange" label="时间范围">
                <RangePicker 
                  style={{ width: '100%' }}
                  placeholder={['开始时间', '结束时间']}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item name="usageLevel" label="使用率级别">
                <Select placeholder="请选择使用率级别" allowClear>
                  <Option value="low">低使用率(&lt;30%)</Option>
                  <Option value="medium">中等使用率(30%-70%)</Option>
                  <Option value="high">高使用率(&gt;70%)</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Space>
                <Button type="primary" icon={<SearchOutlined />}>
                  搜索
                </Button>
                <Button icon={<ReloadOutlined />}>
                  重置
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card>
        <Table
          columns={columns}
          dataSource={mockInefficientData}
          rowKey="id"
          pagination={{
            total: mockInefficientData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`
          }}
        />
      </Card>
    </div>
  )
}

export default InefficientHosts