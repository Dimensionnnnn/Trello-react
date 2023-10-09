import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Comment } from "types/types";

const selectComments = (state: RootState) => state.comments;

const selectFilteredComments = (state: RootState, cardId: string) => {
    const comments = Object.values(selectComments(state));
    return comments.filter((comment: Comment) => comment.cardId === cardId)
}

const getCommentsCount = (state:RootState, cardId: string) => {
    const comments = Object.values(selectComments(state));
    return comments.filter((comment: Comment) => comment.cardId === cardId).length
}

export const selectCommentsByCardId = createSelector(
    selectFilteredComments,
    (filteredComments: Comment[]) => filteredComments
)

export const getCommentsCountByCardId = createSelector(
    getCommentsCount,
    (commentsCount: number) => commentsCount
)