import React, { useEffect, useState } from 'react'
import { 
  Table, 
  Button, 
  Space, 
  Typography, 
  Card, 
  Form, 
  Input, 
  Select, 
  DatePicker,
  Tag, 
  Timeline,
  Row,
  Col
} from 'antd'
import { 
  SearchOutlined, 
  ReloadOutlined,
  SyncOutlined
} from '@ant-design/icons'
import dayjs from 'dayjs'

const { Title } = Typography
const { RangePicker } = DatePicker

const ChangeManagement: React.FC = () => {
  const [form] = Form.useForm()
  const [timelineMode, setTimelineMode] = useState(false)

  const mockChangeData = [
    {
      id: '1',
      sampleTime: '2025/10/20 14:30:25',
      ip: '10.45.65.33',
      operationType: 1,
      operator: '系统',
      originalValue: '正常',
      newValue: '低利用率',
      remark: '系统自动检测'
    },
    {
      id: '2',
      sampleTime: '2025/10/19 09:15:10',
      ip: '10.20.235.142',
      operationType: 2,
      operator: '管理员',
      originalValue: '正常',
      newValue: '负载异常',
      remark: '手动调整'
    }
  ]

  const getOperationTypeTag = (type: number) => {
    const typeMap = {
      1: { color: 'blue', text: '管理状态' },
      2: { color: 'orange', text: '设备状态' }
    }
    const config = typeMap[type as keyof typeof typeMap]
    return <Tag color={config.color}>{config.text}</Tag>
  }

  const columns = [
    {
      title: '采样时间',
      dataIndex: 'sampleTime',
      key: 'sampleTime',
      width: 150,
    },
    {
      title: '云主机IP',
      dataIndex: 'ip',
      key: 'ip',
      width: 120,
    },
    {
      title: '操作类型',
      dataIndex: 'operationType',
      key: 'operationType',
      render: (type: number) => getOperationTypeTag(type),
      width: 100,
    },
    {
      title: '操作人',
      dataIndex: 'operator',
      key: 'operator',
      width: 100,
    },
    {
      title: '原始值',
      dataIndex: 'originalValue',
      key: 'originalValue',
      width: 100,
    },
    {
      title: '新值',
      dataIndex: 'newValue',
      key: 'newValue',
      width: 100,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      ellipsis: true,
    },
  ]

  const timelineItems = mockChangeData.map(item => ({
    color: item.operationType === 1 ? 'blue' : 'orange',
    children: (
      <div>
        <p><strong>{item.sampleTime}</strong> - {item.ip}</p>
        <p>{getOperationTypeTag(item.operationType)} {item.operator}</p>
        <p>从 {item.originalValue} 变更为 {item.newValue}</p>
        <p style={{ color: '#666' }}>{item.remark}</p>
      </div>
    )
  }))

  return (
    <div>
      <div className="page-header">
        <Title level={2}>变更管理</Title>
        <p>查看云主机状态变更记录和历史操作</p>
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
              <Form.Item name="operationType" label="操作类型">
                <Select placeholder="请选择操作类型" allowClear>
                  <Option value={1}>管理状态</Option>
                  <Option value={2}>设备状态</Option>
                </Select>
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
              <Form.Item name="operator" label="操作人">
                <Input placeholder="请输入操作人" />
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
                <Button 
                  icon={<SyncOutlined />}
                  type={timelineMode ? 'primary' : 'default'}
                  onClick={() => setTimelineMode(!timelineMode)}
                >
                  {timelineMode ? '表格视图' : '时间线视图'}
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card>
        {timelineMode ? (
          <Timeline items={timelineItems} />
        ) : (
          <Table
            columns={columns}
            dataSource={mockChangeData}
            rowKey="id"
            pagination={{
              total: mockChangeData.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `共 ${total} 条记录`
            }}
          />
        )}
      </Card>
    </div>
  )
}

export default ChangeManagement