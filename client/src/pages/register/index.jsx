import React from 'react'
import { Form, Button, Input, message } from 'antd'
import { AddUser } from '../../api/userApi'
import { useNavigate } from 'react-router-dom'

function Register() {

    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage()

    const onFinish = async (values) => {
        
        try {
            const res = await AddUser(values)
            //console.log(res)
            if (res.success){
                console.log("Success: ", res.message)
                messageApi.open({
                    type: 'success',
                    content: res.message
                })
                navigate('/login')
            }
            else{
                console.log("Error: ", res.message)
                messageApi.open({
                    type: 'error',
                    content: res.message
                })
            }
        } catch (error) {
            //console.log(error)
        }

    }
  return (
    <div className='justify-center h-screen'>
        <section className='w-100 bg-gray-100 shadow-lg rounded-lg p-20'>
            <h2 className='text-red-500'>Register</h2>

            <Form layout='vertical' onFinish={onFinish}>
                <Form.Item
                    name="firstName"
                    htmlFor='firstName'
                    label="First Name"
                    rules={[{required: true, message: "Please Enter Your First Name"}]}
                >

                    <Input type='text' placeholder='Enter Your First Name'></Input>
                </Form.Item>
                <Form.Item
                    name="lastName"
                    htmlFor='lastName'
                    label="Last Name"
                    rules={[{required: true, message: "Please Enter Your Last Name"}]}
                >

                    <Input type='text' placeholder='Enter Your Last Name'></Input>
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
                    <Input type='password' placeholder='Enter Your Password'></Input>
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    htmlFor='confirmPassword'
                    label="Confirm Password"
                    rules={[{required: true, message: "Please Confirm Password"}]}
                >
                    <Input type='password' placeholder='Enter Confirm Password'></Input>
                </Form.Item>
                {contextHolder}
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
        </section>
    </div>
  )
}

export default Register