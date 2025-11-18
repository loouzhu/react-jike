import React from 'react'
import { Card, Form, Input, Button, Space, message } from 'antd'
import { fetchLogin } from '@/features/jikeSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './login.scss'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async values => {
    console.log('Success:', values);
    await dispatch(fetchLogin(values))
    message.success('登录成功')
    navigate('/')
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
    message.error('输入格式不正确')
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  const telPasswordLabel = {
    style: {
      width: '28%',
      textAlign: 'center'
    }
  }
  return (
    <div className='login'>
      <Card title="登录" className='login-container'>
        <Form
          name="basic"
          form={form}
          className='login-form'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          // 统一设置字段触发验证的时机
          validateTrigger='onBlur'
        >
          <Form.Item
            label="手机号"
            name="mobile"
            labelCol={telPasswordLabel}
            rules={[
              // 如果写了多条，就会按照顺序依次校验
              { required: true, message: '请输入手机号!' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入11位手机号！' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="验证码"
            name="code"
            labelCol={telPasswordLabel}
            rules={[
              { required: true, message: '请输入验证码!' },
              { pattern: /^246810$/, message: '验证码是246810' }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              &nbsp;&nbsp;
              <Button htmlType="button" onClick={onReset}>
                清空
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div >
  )
}
