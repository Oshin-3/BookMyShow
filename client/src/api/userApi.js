import { axiosInstance } from './index'

export const AddUser = async (value) => {
    try {
        const res = await axiosInstance.post('/api/users/add-user', value)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const LoginUser = async (value) => {
    try {
        const res = await axiosInstance.post('/api/users/login', value)
        console.log("response data -> ", res.data)
        return res.data
    } catch (error) {
        
    }
}

export const GetCurrentUser = async (value) => {
    try {
        const res = await axiosInstance.get('/api/user/get-current-user', value)
        return res.data
    } catch (error) {
        console.log(error)
    }
}