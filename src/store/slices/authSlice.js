import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn: false,
    token: null,
    userProfile: {
        email: '',
        firstName: '',
        lastName: ''
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isLoggedIn = true
            state.token = action.payload.token
            state.userProfile = action.payload.userProfile ??  state.userProfile
        },
        logout: (state) => {
            state.isLoggedIn = false
            state.token = null
            state.userProfile = {
                email: '',
                firstName: '',
                lastName: ''
            }
        }
    }
})

export const {loginSuccess, logout } = authSlice.actions
export default authSlice.reducer