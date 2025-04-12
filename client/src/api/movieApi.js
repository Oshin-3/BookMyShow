import { axiosInstance } from "./index";

export const GetAllMovies = async () => {
    try {
        const res = await axiosInstance.get('/api/movies/get-all-movies')
        //console.log(res)
        return res.data
    } catch (error) {
     console.log(error)        
    }
}

export const AddMovie = async (value) => {
    try {
        console.log("value -> ", value)
        const res = await axiosInstance.post('/api/movies/add-movie', value)
        console.log("res.data-> ", res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const UpdateMovie = async (value) => {
    try {
        console.log("value-> ", value)
        const res = await axiosInstance.put('/api/movies/update-movie', value)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const DeleteMovie = async (value) => {
    try {
        const res = await axiosInstance.put('/api/movies/delete-movie', value)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const GetMovieById = async (id) => {
    try {
        const res = await axiosInstance.get(`/api/movies/movie/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}