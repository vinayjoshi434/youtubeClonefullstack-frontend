import { createSlice, nanoid } from "@reduxjs/toolkit";


//redux slice for authentication data 

const initialState = {
    user: null,
    isAuthenticated: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        loginSuccess(state, action) {
            state.user = action.payload
            state.isAuthenticated = true

        },

        logout(state) {
            state.user = null
            state.isAuthenticated = false
        }

    }

})
export const { loginSuccess, logout } = authSlice.actions; //explicitlty export the reducer to use inside the components to perform change in state

export default authSlice.reducer; // default export for the stor configuration 