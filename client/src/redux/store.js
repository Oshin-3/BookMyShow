import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from './loaderSlice'
import userReducer from './userSlice'
import movieReducer from './movieSlice'
import theaterReducer from './theaterSlice'

const store = configureStore({
    reducer: {
        loaders: loaderReducer,
        users: userReducer,
        movies: movieReducer,
        theaters: theaterReducer
    }
})

export default store