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
  Tag, 
  Modal, 
  message,
  Row,
  Col
} from 'antd'
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined,
  ReloadOutlined 
} from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setHosts, setSearchParams, deleteHost } from '../store/slices/cloudHostSlice'

const { Title } = Typography
const { Option } = Select

const CloudHostManagement: React.FC = () => {
  const dispatch = useAppDispatch()
  const { hosts, loading } = useAppSelector((state) => state.cloudHost)
  const [form] = Form.useForm()
  const [modalVisible, setModalVisible] = useState(false)
  const [editingHost, setEditingHost] = useState<any>(null)

  useEffect(() => {
    // 模拟数据加载
    const mockHosts = [
      {
        id: '1',
        provider: '阿里云',
        region: '南京',
        ip: '10.20.235.142',
        cpu: 2,
        memory: 2,
        disk: 40,
        bandwidth: 5,
        os: 'window server 2008',
        onlineTime: '2025/10/10',
        owner: '孙伟',
        department: 'DSC - 南京技术 - PEVC/WDS - 南京技术 - 股票',
        sharedDepartment: 'DSC - 南京技术 - PEVC',
        enableStatus: 1,
        managementStatus: 1,
        deviceStatus: 1
      },
      {
        id: '2',
        provider: '腾讯云',
        region: '上海',
        ip: '10.45.65.33',
        cpu: 4,
        memory: 8,
        disk: 100,
        bandwidth: 10,
        os: 'CentOS 7',
        onlineTime: '2025/09/15',
        owner: '李明',
        department: 'DSC - 上海技术 - 大数据',
        sharedDepartment: 'DSC - 上海技术',
        enableStatus: 1,
        managementStatus: 2,
        deviceStatus: 1
      }
    ]
    dispatch(setHosts(mockHosts))
  }, [dispatch])

  const handleSearch = (values: any) => {
    dispatch(setSearchParams(values))
  }

  const handleReset = () => {
    form.resetFields()
    dispatch(setSearchParams({}))
  }

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这台云主机吗？',
      onOk: () => {
        dispatch(deleteHost(id))
        message.success('删除成功')
      }
    })
  }

  const getStatusTag = (status: number, type: 'enable' | 'management' | 'device') => {
    const statusMap = {
      enable: {
        1: { color: 'green', text: '启用' },
        2: { color: 'red', text: '删除' }
      },
      management: {
        1: { color: 'blue', text: '正常' },
        2: { color: 'orange', text: '低利用率' },
        3: { color: 'purple', text: '可申请' }
      },
      device: {
        1: { color: 'green', text: '正常' },
        2: { color: 'orange', text: '指标缺失' },
        3: { color: 'red', text: '负载异常' }
      }
    }
    
    const config = (statusMap as any)[type][status]
    return <Tag color={config.color}>{config.text}</Tag>
  }

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
      title: '负责人',
      dataIndex: 'owner',
      key: 'owner',
      width: 100,
    },
    {
      title: '启用状态',
      dataIndex: 'enableStatus',
      key: 'enableStatus',
      render: (status: number) => getStatusTag(status, 'enable'),
      width: 100,
    },
    {
      title: '管理状态',
      dataIndex: 'managementStatus',
      key: 'managementStatus',
      render: (status: number) => getStatusTag(status, 'management'),
      width: 100,
    },
    {
      title: '设备状态',
      dataIndex: 'deviceStatus',
      key: 'deviceStatus',
      render: (status: number) => getStatusTag(status, 'device'),
      width: 100,
    },
    {
      title: '操作',
      key: 'action',
      render: (record: any) => (
        <Space size="small">
          <Button 
            type="link" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
      width: 120,
    },
  ]

  const handleEdit = (host: any) => {
    setEditingHost(host)
    setModalVisible(true)
  }

  const handleAdd = () => {
    setEditingHost(null)
    setModalVisible(true)
  }

  return (
    <div>
      <div className="page-header">
        <Title level={2}>云主机管理</Title>
        <p>管理云主机信息，支持增删改查操作</p>
      </div>

      <Card className="search-form">
        <Form
          form={form}
          layout="inline"
          onFinish={handleSearch}
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
            <Col xs={24} sm={12} md={6}>
              <Form.Item name="status" label="状态">
                <Select placeholder="请选择状态" allowClear>
                  <Option value={1}>正常</Option>
                  <Option value={2}>异常</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Space>
                <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                  搜索
                </Button>
                <Button onClick={handleReset} icon={<ReloadOutlined />}>
                  重置
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card>
        <div style={{ marginBottom: 16 }}>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            新增云主机
          </Button>
        </div>
        
        <Table
          columns={columns}
          dataSource={hosts}
          loading={loading}
          rowKey="id"
          pagination={{
            total: hosts.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`
          }}
        />
      </Card>

      <Modal
        title={editingHost ? '编辑云主机' : '新增云主机'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        <p>云主机编辑功能待实现...</p>
      </Modal>
    </div>
  )
}

export default CloudHostManagement