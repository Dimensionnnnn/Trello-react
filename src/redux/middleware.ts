import { Middleware } from "redux";
import { deleteComment } from "./ducks/comments/comments-slice";
import { Comment } from "types/types";

export const deleteCommentsMiddleware: Middleware = store => next => action => {
    if (action.type === 'cards/deleteCard') {
        const cardId = action.payload;
        const state = store.getState();
        const comments: Comment[] = Object.values(state.comments);

        comments.forEach((comment: Comment) => {
            if (comment.cardId === cardId) {
                store.dispatch(deleteComment(comment.id));
            }
        })
    }
    return next(action);
}