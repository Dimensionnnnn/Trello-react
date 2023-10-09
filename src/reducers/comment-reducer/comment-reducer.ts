import { Comment } from "types/types";
import { AddCommentAction, DeleteCommentAction, UpdateCommentDescriptionAction } from "./comment-action-types";

const initialState: Record<string, Comment> = {}

export const commentReducer = (
    state = initialState,
    action: AddCommentAction | UpdateCommentDescriptionAction | DeleteCommentAction
) => {
    switch (action.type) {
        case 'ADD_COMMENT':
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case 'UPDATE_COMMENT_DESCRIPTION':
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    description: action.payload.description
                }
            }
        case 'DELETE_COMMENT':
            const newState = {...state};
            delete newState[action.payload];
            return newState;
        default:
            return state
    }
}