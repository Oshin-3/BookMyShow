import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from './loaderSlice'
import userReducer from './userSlice'
import movieReducer from './movieSlice'

const store = configureStore({
    reducer: {
        loaders: loaderReducer,
        users: userReducer,
        movies: movieReducer
    }
})

export default store