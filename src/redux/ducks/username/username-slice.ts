import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "";

const usernameSlice = createSlice({
    name: "username",
    initialState,
    reducers: {
        updateUsername: (state, {payload}: PayloadAction<string>) => {
            state = payload
            return payload
        },
        logout: (state) => {
            state = ""
            return ""
        }
    }
})

export const { updateUsername, logout } = usernameSlice.actions;
export default usernameSlice.reducer;