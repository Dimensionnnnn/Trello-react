import React from "react";
import { Comment } from "components/comment/comment";
import styles from "./comments-list.module.scss";
import { selectCommentsByCardId } from "redux/ducks/comments/selectors";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

interface Props {
    cardId?: string;
}

export const CommentsList: React.FC<Props> = ({cardId}) => {
    const comments = useSelector((state: RootState) => selectCommentsByCardId(state, cardId ?? ""));
    const sortedComments = comments
        ? Object.values(comments).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        : [];
    return (
        <div className={styles.root}>
            {sortedComments.map((comment) => (
                <Comment
                    key={comment.id}
                    comment={comment}
                />
            ))}
        </div>
    )
}