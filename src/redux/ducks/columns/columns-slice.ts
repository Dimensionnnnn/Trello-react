import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { columns } from "data/data";
import { Column } from "types/types";

interface DeleteColumnPayload {
    columnId: string;
    cardsIds: string[];
}

const initialState: Record<string, Column> = columns;

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
        deleteColumn: (state, {payload}: PayloadAction<DeleteColumnPayload>) => {
            const { columnId } = payload;
            delete state[columnId];
        }
    }
})

export const { addColumn, updateColumnTitle, deleteColumn } = columnsSlice.actions;
export default columnsSlice.reducer;