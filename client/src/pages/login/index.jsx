import React from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { LoginUser } from '../../api/userApi'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [messageApi, contextHeader] = message.useMessage()
    const navigate = useNavigate()

    const onFinish = async (values) => {
        try {
            const res = await LoginUser(values)
            console.log("User-> ", res)
            if (res.success){
                messageApi.open({
                    type: 'success',
                    content: res.message
                })
                localStorage.setItem("token", res.data)
                if (res.user.role == "user")
                {
                    navigate('/profile')
                }else{
                    navigate('/')
                }
                
            }
            else {
                messageApi.open({
                    type: 'error',
                    content: res.message
                })
            }
        } catch (error) {
            console.log(error)
            messageApi.open({
                type: 'error',
                content: 'Some error occured.'
            })
        }
    }

  return (
    <div className='justify-center  h-screen'>
        <section className='w-100 bg-gray-100 shadow-lg rounded-lg p-20'>
            <h2 className='font text-red-500'>Login</h2>
            
            <Form layout='vertical' onFinish={onFinish}>
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
                {contextHeader}
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Sign In</Button>
                </Form.Item>
            </Form>
        </section>
    </div>
  )
}

export default Login