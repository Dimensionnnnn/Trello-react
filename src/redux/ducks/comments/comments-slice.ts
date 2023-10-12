import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "types/types";
import { deleteCard } from "../cards/cards-slice";

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
        builder.addCase(deleteCard, (state, action) => {
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