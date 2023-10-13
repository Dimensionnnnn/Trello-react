import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card } from "types/types";
import { deleteColumn } from "../columns/columns-slice";

const initialState: Record<string, Card> = {};

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        addCard: (state, {payload}: PayloadAction<Card>) => {
            state[payload.id] = payload;
        },
        updateCardTitle: (state, {payload}: PayloadAction<{ id: string; title: string }>) => {
            state[payload.id].title = payload.title
        },
        updateCardDescription: (state, {payload}: PayloadAction<{ id: string; description: string }>) => {
            state[payload.id].description = payload.description
        },
        deleteCard: (state, {payload}: PayloadAction<string>) => {
            delete state[payload];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteColumn, (state, action) => {
            const {cardsIds} = action.payload;
            cardsIds.forEach((cardId) => {
                delete state[cardId];
            })
        })
    }
})

export const { addCard, updateCardTitle, updateCardDescription, deleteCard } = cardsSlice.actions;
export default cardsSlice.reducer;