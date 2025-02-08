import { axiosInstance } from ".";

export const AddTheater = async(value) => {
    try {
        const res = await axiosInstance.post('/api/theaters/add-theater', value)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const UpdateTheater = async(value) => {
    try {
        const res = await axiosInstance.put('/api/theaters/update-theater', value)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const DeleteTheater = async(theaterId) => {
    try {
        const res = await axiosInstance.delete(`/api/theaters/delete-theater/${theaterId}`)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const GetAllTheaters = async() => {
    try {
        const res = await axiosInstance.get('/api/theaters/get-all-theaters')
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const GetAllTheatersByOwner = async(ownerId) => {
    try {
        const res = await axiosInstance.get(`/api/theaters/get-all-theaters-by-owner/${ownerId}`)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}