import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: null
}

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        nullify: (state) => {
            state.value = null
        },
        test_it: (state) => {
            state.value = "ciao";
        },
        change_token: (state, new_value) => {
            state.value = new_value.payload
        },
        init_admin: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {change, nullify, test_it, init_admin} = adminSlice.actions

export default adminSlice.reducer