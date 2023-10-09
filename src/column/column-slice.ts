import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Column } from "types/types";

const initialState: Record<string, Column> = {};

const columnSlice = createSlice({
    name: 'column',
    initialState,
    reducers: {
        updateColumnTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
            state[action.payload.id].title = action.payload.title
        }
    }
})

export const { updateColumnTitle } = columnSlice.actions;
export default columnSlice.reducer;