import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ShowLoader, HideLoader } from '../redux/loaderSlice'
import { SetUser } from '../redux/userSlice'
import { HomeOutlined, LogoutOutlined, ProfileOutlined, UserOutlined} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { GetCurrentUser } from '../api/userApi'

function ProtectedRoute({children}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.users)

  
    const navItem = [
        {label: <span onClick={() => {
            navigate('/profile')
        }}>Home</span>, icon: <HomeOutlined/>},
        {label: `${user ? user.firstName +" " + user.lastName : " "}`, icon: <UserOutlined/>, children: [
            {label: <span onClick={() => {
                if (user.role == "admin"){
                    navigate('/admin')
                }else if (user.role == "partner"){
                    navigate('/partner')
                }else{
                    navigate('/profile')
                }
            }}>My Profile</span>, icon: <ProfileOutlined/>},
            {label: <span onClick={() => {
                localStorage.removeItem("token")
                navigate("/login")
            }}>Logout</span>, icon: <LogoutOutlined/>}
        ]}
    ]

    const { Header, Footer, Sider, Content} = Layout

    const getCurrentUser = async () => {
        try {
            dispatch(ShowLoader())
            const res = await GetCurrentUser()
            console.log("Get current user:",res.data)
            dispatch(SetUser(res.data))
            dispatch(HideLoader())
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (localStorage.getItem("token")){
            console.log("fetched token -> ", localStorage.getItem("token"))
            getCurrentUser()
        }
        else{
            navigate('/login')
        }
    }, [])

    //console.log("User -> ", user)
  return (
    
    user && (
        <>
        <Layout>
            <Header className='d-flex justify-content-between text-center align-item-center'>
                <h3 className='text-red-500 cursor-pointer' onClick={() => {
                    navigate('/profile')
                }}>Book My Show</h3>
                <Menu theme='dark' mode='horizontal' items={navItem}></Menu>
            </Header>
            <div>{children}</div>
        </Layout>
        </>
    )
  )
}

export default ProtectedRoute