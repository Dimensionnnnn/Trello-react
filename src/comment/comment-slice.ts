import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "types/types";

const initialState: Record<string, Comment> = {};

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        addComment: (state, action: PayloadAction<Comment>) => {
            state[action.payload.id] = action.payload;
        },
        updateCommentDescription: (state, action: PayloadAction<{ id: string; description: string }>) => {
            state[action.payload.id].description = action.payload.description
        },
        deleteComment: (state, action: PayloadAction<string>) => {
            delete state[action.payload];
        }
    }
})

export const { addComment, updateCommentDescription, deleteComment } = commentSlice.actions;
export default commentSlice.reducer;