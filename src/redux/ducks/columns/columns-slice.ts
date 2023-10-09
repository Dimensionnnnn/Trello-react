import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Column } from "types/types";
import { columns } from "data/data";

const initialState: Record<string, Column> = columns;

const columnsSlice = createSlice({
    name: 'columns',
    initialState,
    reducers: {
        updateColumnTitle: (state, {payload}: PayloadAction<{ id: string; title: string }>) => {
            state[payload.id].title = payload.title
        }
    }
})

export const { updateColumnTitle } = columnsSlice.actions;
export default columnsSlice.reducer;