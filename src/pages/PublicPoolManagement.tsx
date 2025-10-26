import React from 'react'
import { 
  Table, 
  Button, 
  Typography, 
  Card, 
  Form, 
  Input, 
  Select, 
  Tag,
  Space,
  Row,
  Col
} from 'antd'
import { SearchOutlined, ReloadOutlined, TeamOutlined } from '@ant-design/icons'

const { Title } = Typography
const { Option } = Select

const PublicPoolManagement: React.FC = () => {
  const [form] = Form.useForm()

  const mockPublicPoolData = [
    {
      id: '1',
      ip: '10.20.235.142',
      provider: '阿里云',
      region: '南京',
      cpu: 2,
      memory: 2,
      disk: 40,
      os: 'window server 2008',
      enterTime: '2025/10/15',
      enterReason: '低利用率自动转入',
      originalOwner: '孙伟',
      currentStatus: '可申请'
    },
    {
      id: '2',
      ip: '10.45.65.33',
      provider: '腾讯云',
      region: '上海',
      cpu: 4,
      memory: 8,
      disk: 100,
      os: 'CentOS 7',
      enterTime: '2025/10/10',
      enterReason: '项目结束回收',
      originalOwner: '李明',
      currentStatus: '可申请'
    }
  ]

  const columns = [
    {
      title: '云主机IP',
      dataIndex: 'ip',
      key: 'ip',
      width: 120,
    },
    {
      title: '厂商',
      dataIndex: 'provider',
      key: 'provider',
      width: 100,
    },
    {
      title: '区域',
      dataIndex: 'region',
      key: 'region',
      width: 80,
    },
    {
      title: '配置',
      key: 'spec',
      render: (record: any) => (
        <span>{record.cpu}核/{record.memory}G/{record.disk}G</span>
      ),
      width: 120,
    },
    {
      title: '系统',
      dataIndex: 'os',
      key: 'os',
      width: 150,
    },
    {
      title: '进入时间',
      dataIndex: 'enterTime',
      key: 'enterTime',
      width: 120,
    },
    {
      title: '进入原因',
      dataIndex: 'enterReason',
      key: 'enterReason',
      width: 150,
    },
    {
      title: '原负责人',
      dataIndex: 'originalOwner',
      key: 'originalOwner',
      width: 100,
    },
    {
      title: '当前状态',
      dataIndex: 'currentStatus',
      key: 'currentStatus',
      render: (status: string) => (
        <Tag color="purple" icon={<TeamOutlined />}>
          {status}
        </Tag>
      ),
      width: 100,
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="small">
          <Button type="link" size="small">
            申请使用
          </Button>
          <Button type="link" size="small">
            查看详情
          </Button>
        </Space>
      ),
      width: 120,
    },
  ]

  return (
    <div>
      <div className="page-header">
        <Title level={2}>公共池管理</Title>
        <p>管理可申请的公共云主机资源池</p>
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
              <Form.Item name="provider" label="厂商">
                <Select placeholder="请选择厂商" allowClear>
                  <Option value="阿里云">阿里云</Option>
                  <Option value="腾讯云">腾讯云</Option>
                  <Option value="华为云">华为云</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item name="region" label="区域">
                <Select placeholder="请选择区域" allowClear>
                  <Option value="南京">南京</Option>
                  <Option value="上海">上海</Option>
                  <Option value="北京">北京</Option>
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
          dataSource={mockPublicPoolData}
          rowKey="id"
          pagination={{
            total: mockPublicPoolData.length,
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

export default PublicPoolManagement