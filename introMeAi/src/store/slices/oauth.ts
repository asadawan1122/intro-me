import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
}

export const oauth = createSlice({
    name: 'oauth',
    initialState,
    reducers: {
        isLoggedIn: (state: any) => {
            state.value = true
        },
    },
})

export const { isLoggedIn } = oauth.actions
export default oauth.reducer