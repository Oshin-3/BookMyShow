import React from 'react'
import { Form, Button, Input } from 'antd'

function Register() {
  return (
    <div className='justify-center h-screen'>
        <section className='w-100 bg-gray-100 shadow-lg rounded-lg p-20'>
            <h2 className='text-red-500'>Register</h2>

            <Form layout='vertical'>
                <Form.Item
                    name="name"
                    htmlFor='name'
                    label="Name"
                    rules={[{required: true, message: "Please Enter Your Name"}]}
                >

                    <Input type='text' placeholder='Enter Your Name'></Input>
                </Form.Item>
                <Form.Item
                    name="email"
                    htmlFor='email'
                    label="Email"
                    rules={[{required: true, message: "Please Enter Your Email"}]}
                >

                    <Input type='text' placeholder='Enter Your Email'></Input>
                </Form.Item>
                <Form.Item
                    name="mobileNo"
                    htmlFor='mobileNo'
                    label="Mobile No."
                    rules={[{required: true, message: "Please Enter Your Mobile Number"}]}
                >

                    <Input type='text' placeholder='Enter Your Mobile Number'></Input>
                </Form.Item>
                <Form.Item
                    name="password"
                    htmlFor='password'
                    label="Password"
                    rules={[{required: true, message: "Please Enter Your Password"}]}
                >

                    <Input type='text' placeholder='Enter Your Password'></Input>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
        </section>
    </div>
  )
}

export default Register