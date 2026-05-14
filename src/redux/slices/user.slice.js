import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    user: null,
    token: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state,action) => {
            const userPayload = action.payload;
            Object.assign(state,userPayload)
        },
        logoutUser: (state,action) => {
            state.user = null;
            state.token = null
        }
    }
})

export const { logoutUser,updateUser } = userSlice.actions;
export default userSlice