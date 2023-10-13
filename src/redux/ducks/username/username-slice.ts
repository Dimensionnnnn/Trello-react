import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "";

const usernameSlice = createSlice({
    name: "username",
    initialState,
    reducers: {
        updateUsername: (state, {payload}: PayloadAction<string>) => {
            return payload
        },
        deleteUsername: (state, {payload}: PayloadAction<string>) => {
            return ""
        }
    }
})

export const { updateUsername, deleteUsername } = usernameSlice.actions;
export default usernameSlice.reducer;