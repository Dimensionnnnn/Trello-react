import { Comment } from "types/types";

export interface AddCommentAction {
    type: 'ADD_COMMENT';
    payload: Comment;
}

export interface UpdateCommentDescriptionAction {
    type: 'UPDATE_COMMENT_DESCRIPTION';
    payload: {
        id: string;
        description: string;
    };
}

export interface DeleteCommentAction {
    type: 'DELETE_COMMENT';
    payload: string;
}