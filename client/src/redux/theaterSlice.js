import { createSlice } from "@reduxjs/toolkit";

const theaterSlice = createSlice({
    name: "theaters",
    initialState: {
        theater: null
    },
    reducers: {
        SetTheater: (state, action) => {
            state.theater = action.payload
        }
    }
})

export const { SetTheater } = theaterSlice.actions
export default theaterSlice.reducer