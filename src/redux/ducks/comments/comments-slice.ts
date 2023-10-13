import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "types/types";
import { deleteCard } from "../cards/cards-slice";
import { deleteColumn } from "../columns/columns-slice";

const initialState: Record<string, Comment> = {};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment: (state, {payload}: PayloadAction<Comment>) => {
            state[payload.id] = payload;
        },
        updateCommentDescription: (state, {payload}: PayloadAction<{ id: string; description: string }>) => {
            state[payload.id].description = payload.description
        },
        deleteComment: (state, {payload}: PayloadAction<string>) => {
            delete state[payload];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteColumn, (state, action) => {
                const {cardsIds} = action.payload;
                cardsIds.forEach((cardId) => {
                    for (const commentId in state) {
                        if (state[commentId].cardId === cardId) {
                            delete state[commentId];
                        }
                    }
                })
            })
            .addCase(deleteCard, (state, action) => {
                const cardIdToDelete = action.payload;
                for (const commentId in state) {
                    if (state[commentId].cardId === cardIdToDelete) {
                        delete state[commentId];
                    }
                }
            })
    }
})

export const { addComment, updateCommentDescription, deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;