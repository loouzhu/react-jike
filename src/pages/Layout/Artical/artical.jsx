import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm } from 'antd'
// 引入汉化包，让时间选择器选择中文
import locale from 'antd/es/date-picker/locale/zh_CN'
import { Table, Tag, Space } from 'antd'
import { useSelector } from 'react-redux'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { getArticleListAPI, deleteArticalAPI } from '@/apis/artical'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const navigate = useNavigate()
  // 准备列数据
  // 准备状态枚举
  const state = {
    1: <Tag color="warning">待审核</Tag>,
    2: <Tag color="success">审核通过</Tag>
  }
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      /* render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      } */
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      // data: 1 待审核
      // data: 2 审核通过
      render: data => state[data]
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/publish?id=${data.id}`)} />
            <Popconfirm
              title="删除文章"
              description="确认删除该文章？"
              onConfirm={() => onConfirm(data)}
              okText="是"
              cancelText="否"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]
  // 获取频道列表
  const channelList = useSelector((state) => state.jike.channelList)
  // 获取文章列表
  const [articleList, setArticleList] = useState([])
  // 获取文章数
  const [count, setCount] = useState(0)
  // 筛选文章
  // 本质是向后端请求不同参数从而展示满足条件的数据
  const [reqData, setReqData] = useState({
    status: '',
    channel_id: '',
    begin_pubdate: '',
    end_pubdate: '',
    page: 1,
    per_page: 4
  })

  // 筛选文章
  const onFinish = (formValue) => {
    setReqData({
      ...reqData,
      status: formValue.status,
      channel_id: formValue.channel_id,
      begin_pubdate: formValue.date[0].format('YYYY-MM-DD'),
      end_pubdate: formValue.date[1].format('YYYY-MM-DD'),
    })
  }

  // 切换页面
  const onPageChange = (current) => {
    setReqData({
      ...reqData,
      page: current
    })
  }

  // 删除文章
  const onConfirm = async (data) => {
    await deleteArticalAPI(data.id)
    setReqData({ ...reqData })
  }

  // 更新信息时触发重新渲染
  useEffect(() => {
    async function getArticleList() {
      const res = await getArticleListAPI(reqData)
      setArticleList(res.data.results)
      setCount(res.data.total_count)
    }
    getArticleList()
  }, [reqData])

  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '文章列表' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {
                channelList.map((item) => {
                  return <Option value={item.id} key={item.id}>{item.name}</Option>
                })
              }
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/*展示文章*/}
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={articleList} pagination={{
          align: 'center',
          total: count,
          pageSize: reqData.per_page,
          onChange: onPageChange
        }} />
      </Card>
    </div>
  )
}

export default Article