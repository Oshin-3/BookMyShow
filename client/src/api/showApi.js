import { axiosInstance } from ".";

export const AddShows = async (values) => {
    try {
        const res = await axiosInstance.post('/api/shows/add-show', values)
        console.log("add shows ", res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const UpdateShow = async (values) => {
    try {
        const res = await axiosInstance.put('/api/shows/update-show', values)
        console.log("update shows ", res.data)
        return res.data
        
    } catch (error) {
        console.log(error)
    }
}

export const DeleteShow = async (showId) => {
    try {
        const res = await axiosInstance.delete(`/api/shows/delete-show/${showId}`)
        console.log("delete show ", res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const GetAllShowsByTheater = async (theaterId) => {
    try {
        const res = await axiosInstance.get(`/api/shows/get-all-shows-by-theater/${theaterId}`)
        console.log("get all shows by theater ", res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const GetAllTheatersByMovie = async (value) => {
    try {
        const res = await axiosInstance.post('/api/shows/get-all-theaters-by-movie', value)
        console.log("get all theaters by movie ", res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const GetShowById = async (showId) => {
    try {
        const res = await axiosInstance.get(`/api/shows/get-show-by-id/${showId}`)
        console.log("get show by id ", res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}