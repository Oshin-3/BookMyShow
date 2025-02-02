import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'

function Login() {
  return (
    <div className='justify-center  h-screen'>
        <section className='w-100 bg-gray-100 shadow-lg rounded-lg p-20'>
            <h2 className='font text-red-500'>Login</h2>
            
            <Form layout='vertical'>
                <Form.Item
                    name="email"
                    htmlFor='email'
                    label='Email'
                    rules={[{required: true, message: "Please enter your email"}]}
                >
                    <Input type='text' placeholder='Enter Email'></Input>
                </Form.Item>
                <Form.Item
                    name="password"
                    htmlFor='password'
                    label='Password'
                    rules={[{required: true, message: "Please enter your password"}]}
                >
                    <Input type='password' placeholder='Enter Password'></Input>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Sign In</Button>
                </Form.Item>
            </Form>
        </section>
    </div>
  )
}

export default Login