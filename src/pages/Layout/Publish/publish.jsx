import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { getChannelAPI, publishArticleAPI } from '@/apis/artical'
import './index.scss'
import { useEffect, useState } from 'react'

const { Option } = Select

const Publish = () => {
  const [form] = Form.useForm()

  // 获取频道列表
  const [channelList, setChannelList] = useState([])
  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelAPI()
      setChannelList(res.data.channels)
    }
    getChannelList()
  }, [])

  // 提交表单
  const onFinish = (formValue) => {
    const { title, channel_id, content } = formValue
    // 处理收集到的表单数据
    const resData = {
      title,
      content,
      cover: {
        type: imageType,
        images: imageList.map((item) => item.response.data.url)
      },
      channel_id
    }
    publishArticleAPI(resData).then(() => {
      // 提示发布状态
      message.success('文章发布成功')
      // 清除表单数据
      form.resetFields()
    })
  }

  // 上传图片的状态改变时的回调
  const [imageList, setImageList] = useState([])
  const onChange = (value) => {
    console.log(value.fileList)
    setImageList(value.fileList)
    message.loading('上传中')
  }

  // 选择上传的封面个数
  const [imageType, setImageType] = useState(1)
  const onTypeChange = (e) => {
    const type = e.target.value
    setImageType(type)
  }
  return (
    <div className="publish">
      <Card
        // 标题
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '发布文章' },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
          form={form}
        >
          {/* 标题 */}
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          {/* 频道 */}
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {/* 封面 */}
          <Form.Item label="封面" >
            <Form.Item name='type'>
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 && <Upload
              // 决定选择文件框的外观样式
              listType="picture-card"
              // 控制显示上传列表,这个属性默认有，默认为true
              showUploadList
              name='image'
              action={'http://geek.itheima.net/v1_0/upload'}
              onChange={onChange}
              maxCount={imageType}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>}
          </Form.Item>
          {/* 内容 */}
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >

            <ReactQuill
              theme="snow"
              className='publish-quill'
              placeholder="请输入文章内容"
              style={{ height: 300, marginBottom: 30 }}
            />
          </Form.Item>
          {/* 发布按钮 */}
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish