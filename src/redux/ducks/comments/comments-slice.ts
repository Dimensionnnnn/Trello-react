import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "types/types";

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
    }
})

export const { addComment, updateCommentDescription, deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;