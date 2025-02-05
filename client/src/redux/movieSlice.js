import { createSlice } from '@reduxjs/toolkit'

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        movie: null
    },
    reducers: {
        SetMovie: (state, action) => {
            state.movie = action.payload
        }
    }
})

export const { SetMovie } = movieSlice.actions
export default movieSlice.reducer