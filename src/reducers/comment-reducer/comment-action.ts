import { Comment } from "types/types";
import { AddCommentAction, DeleteCommentAction, UpdateCommentDescriptionAction } from "./comment-action-types";

export const addComment = (commentData: Comment): AddCommentAction => ({
    type: 'ADD_COMMENT',
    payload: commentData
})

export const updateCommentDescription = (id: string, description: string): UpdateCommentDescriptionAction => ({
    type: 'UPDATE_COMMENT_DESCRIPTION',
    payload: {
        id,
        description
    }
})

export const deleteComment = (id: string): DeleteCommentAction => ({
    type: 'DELETE_COMMENT',
    payload: id
})