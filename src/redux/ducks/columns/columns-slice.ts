import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Column } from "types/types";

const initialState: Record<string, Column> = {};

const columnsSlice = createSlice({
    name: 'columns',
    initialState,
    reducers: {
        addColumn: (state, {payload}: PayloadAction<Column>) => {
            state[payload.id] = payload;
        },
        updateColumnTitle: (state, {payload}: PayloadAction<{ id: string; title: string }>) => {
            state[payload.id].title = payload.title
        },
        deleteColumn: (state, {payload}: PayloadAction<string>) => {
            delete state[payload];
        }
    }
})

export const { addColumn, updateColumnTitle, deleteColumn } = columnsSlice.actions;
export default columnsSlice.reducer;