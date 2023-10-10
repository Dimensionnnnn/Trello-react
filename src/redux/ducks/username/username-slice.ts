import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "";

const usernameSlice = createSlice({
    name: "username",
    initialState,
    reducers: {
        updateUsername: (state, {payload}: PayloadAction<string>) => {
            return payload
        }
    }
})

export const { updateUsername } = usernameSlice.actions;
export default usernameSlice.reducer;