import React from 'react'
import { Card, Form, Input, Button, Space } from 'antd'
import './login.scss'

export default function Login() {
  const onFinish = values => {
    console.log('Success:', values);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
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
            name="tel"
            labelCol={telPasswordLabel}
            rules={[
              // 如果写了多条，就会按照顺序依次校验
              { required: true, message: '请输入手机号!' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入13位手机号！' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            labelCol={telPasswordLabel}
            rules={[{ required: true, message: '请输入密码!' }]}
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
