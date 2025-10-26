import React, { useState } from 'react'
import { 
  Tabs, 
  Typography, 
  Card, 
  Row, 
  Col, 
  DatePicker,
  Table,
  Progress,
  Button,
  Tree,
  Space,
  Divider,
  Tag
} from 'antd'
import { 
  SearchOutlined,
  ReloadOutlined
} from '@ant-design/icons'

const { Title } = Typography
const { RangePicker } = DatePicker

const MultiDimensionMetrics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('host')
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([])
  const [selectedHosts, setSelectedHosts] = useState<string[]>([])
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['host-metrics', 'channel-metrics', 'business-metrics', 'vendor-group', 'region-group'])

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

  // 多维度筛选数据
  const metricsTreeData = [
    {
      title: '云主机维度指标',
      key: 'host-metrics',
      children: [
        { title: 'CPU使用率', key: 'cpuUsage', isLeaf: true },
        { title: '内存使用率', key: 'memoryUsage', isLeaf: true },
        { title: '磁盘使用率', key: 'diskUsage', isLeaf: true },
        { title: '网络流入', key: 'networkIn', isLeaf: true },
        { title: '网络流出', key: 'networkOut', isLeaf: true },
        { title: '进程数', key: 'processCount', isLeaf: true },
        { title: '任务数', key: 'taskCount', isLeaf: true },
      ],
    },
    {
      title: '通道维度指标',
      key: 'channel-metrics',
      children: [
        { title: '任务总数', key: 'channelTaskCount', isLeaf: true },
        { title: '成功数', key: 'channelSuccessCount', isLeaf: true },
        { title: '失败数', key: 'channelFailCount', isLeaf: true },
        { title: '空结果数', key: 'channelEmptyCount', isLeaf: true },
        { title: '去重数', key: 'channelDedupCount', isLeaf: true },
      ],
    },
    {
      title: '业务维度指标',
      key: 'business-metrics',
      children: [
        { title: '业务任务数', key: 'businessTaskCount', isLeaf: true },
        { title: '业务成功率', key: 'businessSuccessRate', isLeaf: true },
        { title: '业务失败率', key: 'businessFailRate', isLeaf: true },
        { title: '业务响应时间', key: 'businessResponseTime', isLeaf: true },
      ],
    },
  ]

  const hostsTreeData = [
    {
      title: '按厂商分组',
      key: 'vendor-group',
      children: [
        {
          title: '阿里云',
          key: 'aliyun',
          children: [
            { title: '10.20.235.142', key: 'host-1', isLeaf: true },
            { title: '10.20.235.143', key: 'host-2', isLeaf: true },
          ],
        },
        {
          title: '腾讯云',
          key: 'tencent',
          children: [
            { title: '10.45.65.33', key: 'host-3', isLeaf: true },
            { title: '10.45.65.34', key: 'host-4', isLeaf: true },
          ],
        },
      ],
    },
    {
      title: '按区域分组',
      key: 'region-group',
      children: [
        {
          title: '南京',
          key: 'nanjing',
          children: [
            { title: '10.20.235.142', key: 'host-5', isLeaf: true },
            { title: '10.20.235.143', key: 'host-6', isLeaf: true },
          ],
        },
        {
          title: '上海',
          key: 'shanghai',
          children: [
            { title: '10.45.65.33', key: 'host-7', isLeaf: true },
            { title: '10.45.65.34', key: 'host-8', isLeaf: true },
          ],
        },
      ],
    },
  ]

  // 指标映射关系
  const metricMapping = {
    cpuUsage: { label: 'CPU使用率', unit: '%', type: 'percentage' },
    memoryUsage: { label: '内存使用率', unit: '%', type: 'percentage' },
    diskUsage: { label: '磁盘使用率', unit: '%', type: 'percentage' },
    networkIn: { label: '网络流入', unit: 'MB/s', type: 'value' },
    networkOut: { label: '网络流出', unit: 'MB/s', type: 'value' },
    processCount: { label: '进程数', unit: '个', type: 'value' },
    taskCount: { label: '任务数', unit: '个', type: 'value' },
    channelTaskCount: { label: '通道任务数', unit: '个', type: 'value' },
    channelSuccessCount: { label: '通道成功数', unit: '个', type: 'value' },
    channelFailCount: { label: '通道失败数', unit: '个', type: 'value' },
    channelEmptyCount: { label: '通道空结果数', unit: '个', type: 'value' },
    channelDedupCount: { label: '通道去重数', unit: '个', type: 'value' },
    businessTaskCount: { label: '业务任务数', unit: '个', type: 'value' },
    businessSuccessRate: { label: '业务成功率', unit: '%', type: 'percentage' },
    businessFailRate: { label: '业务失败率', unit: '%', type: 'percentage' },
    businessResponseTime: { label: '业务响应时间', unit: 'ms', type: 'value' },
  }

  // 获取过滤后的表格列
  const getFilteredColumns = () => {
    const baseColumns = [
      {
        title: '云主机IP',
        dataIndex: 'ip',
        key: 'ip',
        fixed: 'left' as const,
        width: 120,
      },
      {
        title: '采样时间',
        dataIndex: 'sampleTime',
        key: 'sampleTime',
        fixed: 'left' as const,
        width: 150,
      },
    ]

    const metricColumns = selectedMetrics.map(metricKey => {
      const metric = (metricMapping as any)[metricKey]
      return {
        title: metric.label,
        dataIndex: metricKey,
        key: metricKey,
        render: (value: any) => {
          if (metric.type === 'percentage') {
            return (
              <Space>
                <Progress 
                  percent={value} 
                  size="small" 
                  strokeColor={value > 90 ? '#ff4d4f' : value > 70 ? '#faad14' : '#52c41a'}
                  format={percent => `${percent}${metric.unit}`}
                />
                {value > 90 && <Tag color="red">告警</Tag>}
              </Space>
            )
          }
          return `${value} ${metric.unit}`
        },
        width: 150,
      }
    })

    return [...baseColumns, ...metricColumns]
  }

  // 处理筛选查询
  const handleFilterQuery = () => {
    // 模拟数据过滤
    const mockFilteredData = [
      {
        ip: '10.20.235.142',
        sampleTime: '2025/10/20 14:30',
        cpuUsage: 20,
        memoryUsage: 30,
        diskUsage: 99,
        networkIn: 1.45,
        networkOut: 24.33,
        processCount: 200,
        taskCount: 3247,
      }
    ]

    // 根据选择的指标过滤数据
    const filtered = mockFilteredData.map(item => {
      const result: any = { ip: item.ip, sampleTime: item.sampleTime }
      selectedMetrics.forEach(metric => {
        result[metric] = item[metric as keyof typeof item]
      })
      return result
    })

    setFilteredData(filtered)
  }

  // 处理指标选择
  const onMetricsCheck = (checkedKeys: any) => {
    setSelectedMetrics(checkedKeys.checked || [])
  }

  // 处理主机选择
  const onHostsCheck = (checkedKeys: any) => {
    setSelectedHosts(checkedKeys.checked || [])
  }

  // 处理树节点展开
  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue as string[])
  }

  const tabItems = [
    {
      key: 'host',
      label: '主机维度',
      children: (
        <Table
          columns={[
            { title: '云主机IP', dataIndex: 'ip', key: 'ip', width: 120 },
            { title: '采样时间', dataIndex: 'sampleTime', key: 'sampleTime', width: 150 },
            { 
              title: 'CPU使用率', 
              dataIndex: 'cpuUsage', 
              key: 'cpuUsage',
              render: (usage: number) => (
                <Progress 
                  percent={usage} 
                  size="small" 
                  strokeColor={usage > 90 ? '#ff4d4f' : usage > 70 ? '#faad14' : '#52c41a'}
                  format={percent => `${percent}%`}
                />
              ),
              width: 150,
            },
            { 
              title: '内存使用率', 
              dataIndex: 'memoryUsage', 
              key: 'memoryUsage',
              render: (usage: number) => (
                <Progress 
                  percent={usage} 
                  size="small" 
                  strokeColor={usage > 90 ? '#ff4d4f' : usage > 70 ? '#faad14' : '#52c41a'}
                  format={percent => `${percent}%`}
                />
              ),
              width: 150,
            },
            { 
              title: '磁盘使用率', 
              dataIndex: 'diskUsage', 
              key: 'diskUsage',
              render: (usage: number) => (
                <Space>
                  <Progress 
                    percent={usage} 
                    size="small" 
                    strokeColor={usage > 90 ? '#ff4d4f' : usage > 70 ? '#faad14' : '#52c41a'}
                    format={percent => `${percent}%`}
                  />
                  {usage > 90 && <Tag color="red">告警</Tag>}
                </Space>
              ),
              width: 150,
            },
            { title: '网络流入', dataIndex: 'networkIn', key: 'networkIn', render: (value: number) => `${value} MB/s`, width: 120 },
            { title: '网络流出', dataIndex: 'networkOut', key: 'networkOut', render: (value: number) => `${value} MB/s`, width: 120 },
            { title: '进程数', dataIndex: 'processCount', key: 'processCount', render: (value: number) => `${value} 个`, width: 100 },
            { title: '任务数', dataIndex: 'taskCount', key: 'taskCount', render: (value: number) => `${value} 个`, width: 100 },
          ]}
          dataSource={mockHostMetrics}
          rowKey="id"
          pagination={{
            total: mockHostMetrics.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`
          }}
        />
      ),
    },
    {
      key: 'channel',
      label: '通道维度',
      children: (
        <Table
          columns={[
            { title: '通道名称', dataIndex: 'channelName', key: 'channelName', width: 120 },
            { title: '任务类型', dataIndex: 'taskType', key: 'taskType', width: 100 },
            { title: '采样时间', dataIndex: 'sampleTime', key: 'sampleTime', width: 150 },
            { title: '任务总数', dataIndex: 'taskCount', key: 'taskCount', render: (value: number) => `${value} 个`, width: 100 },
            { title: '成功数', dataIndex: 'successCount', key: 'successCount', render: (value: number) => `${value} 个`, width: 100 },
            { title: '失败数', dataIndex: 'failCount', key: 'failCount', render: (value: number) => `${value} 个`, width: 100 },
            { title: '空结果数', dataIndex: 'emptyCount', key: 'emptyCount', render: (value: number) => `${value} 个`, width: 100 },
            { title: '去重数', dataIndex: 'dedupCount', key: 'dedupCount', render: (value: number) => `${value} 个`, width: 100 },
          ]}
          dataSource={mockChannelMetrics}
          rowKey="id"
          pagination={{
            total: mockChannelMetrics.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`
          }}
        />
      ),
    },
    {
      key: 'business',
      label: '业务维度',
      children: (
        <Table
          columns={[
            { title: '业务名称', dataIndex: 'businessName', key: 'businessName', width: 120 },
            { title: '云主机IP', dataIndex: 'ip', key: 'ip', width: 120 },
            { title: '采样时间', dataIndex: 'sampleTime', key: 'sampleTime', width: 150 },
            { title: '任务数', dataIndex: 'taskCount', key: 'taskCount', render: (value: number) => `${value} 个`, width: 100 },
            { title: '成功数', dataIndex: 'successCount', key: 'successCount', render: (value: number) => `${value} 个`, width: 100 },
            { title: '失败数', dataIndex: 'failCount', key: 'failCount', render: (value: number) => `${value} 个`, width: 100 },
            { title: '空结果数', dataIndex: 'emptyCount', key: 'emptyCount', render: (value: number) => `${value} 个`, width: 100 },
            { title: '去重数', dataIndex: 'dedupCount', key: 'dedupCount', render: (value: number) => `${value} 个`, width: 100 },
          ]}
          dataSource={mockBusinessMetrics}
          rowKey="id"
          pagination={{
            total: mockBusinessMetrics.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`
          }}
        />
      ),
    },
    {
      key: 'multi-dimension',
      label: '多维度筛选',
      children: (
        <div>
          <Card style={{ marginBottom: 16 }}>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <div style={{ marginBottom: 8 }}>时间范围</div>
                <RangePicker style={{ width: '100%' }} />
              </Col>
              <Col span={16}>
                <Space>
                  <Button type="primary" icon={<SearchOutlined />} onClick={handleFilterQuery}>
                    查询
                  </Button>
                  <Button icon={<ReloadOutlined />}>
                    重置
                  </Button>
                </Space>
              </Col>
            </Row>
          </Card>

          <Row gutter={16}>
            <Col span={8}>
              <Card title="选择指标" size="small">
                <Tree
                  checkable
                  onCheck={onMetricsCheck}
                  onExpand={onExpand}
                  expandedKeys={expandedKeys}
                  treeData={metricsTreeData}
                  height={300}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="选择云主机" size="small">
                <Tree
                  checkable
                  onCheck={onHostsCheck}
                  onExpand={onExpand}
                  expandedKeys={expandedKeys}
                  treeData={hostsTreeData}
                  height={300}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="筛选结果" size="small">
                <div style={{ padding: '8px 0', color: '#666' }}>
                  已选择 {selectedMetrics.length} 个指标，{selectedHosts.length} 台云主机
                </div>
                <Divider style={{ margin: '12px 0' }} />
                <div style={{ color: '#666', fontSize: '12px' }}>
                  点击查询按钮查看筛选结果
                </div>
              </Card>
            </Col>
          </Row>

          {filteredData.length > 0 && (
            <Card style={{ marginTop: 16 }}>
              <Table
                columns={getFilteredColumns()}
                dataSource={filteredData}
                rowKey="ip"
                scroll={{ x: 800 }}
                pagination={{
                  total: filteredData.length,
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total) => `共 ${total} 条记录`
                }}
              />
            </Card>
          )}
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className="page-header">
        <Title level={2}>多维度指标监控</Title>
        <p>查看云主机在不同维度的性能指标和运行状态</p>
      </div>

      <Card>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
        />
      </Card>
    </div>
  )
}

export default MultiDimensionMetrics