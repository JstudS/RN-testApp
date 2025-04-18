import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccsess: (state, action) => {
            state.isLoggedIn = true
            state.token = action.payload.token
        },
        logout: (state) => {
            state.isLoggedIn = false
            state.token = null
        }
    }
})

export const {loginSuccsess, logout } = authSlice.actions
export default authSlice.reducer