import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card } from "types/types";

const initialState: Record<string, Card> = {};

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        addCard: (state, action: PayloadAction<Card>) => {
            state[action.payload.id] = action.payload;
        },
        updateCardTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
            state[action.payload.id].description = action.payload.title
        },
        updateCardDescription: (state, action: PayloadAction<{ id: string; description: string }>) => {
            state[action.payload.id].description = action.payload.description
        },
        deleteCard: (state, action: PayloadAction<string>) => {
            delete state[action.payload];
        }
    }
})

export const { addCard, updateCardTitle, updateCardDescription, deleteCard } = cardSlice.actions;
export default cardSlice.reducer;