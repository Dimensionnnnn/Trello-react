import React from "react";
import { Comment } from "components/comment/comment";
import { Comment as IComment } from "types/types";
import styles from "./comments-list.module.scss";

interface Props {
    comments?: Record<string, IComment>;
    onDescriptionChange: (commentId?: string, newDescription?: string) => void;
    onDeleteComment: (commentId?: string) => void;
}

export const CommentsList: React.FC<Props> = ({comments, onDescriptionChange, onDeleteComment}) => {
    return (
        <div className={styles.root}>
            {comments && Object.values(comments).reverse().map((comment) => (
                <>
                    <div className={styles.author}>Автор: {comment.author}</div>
                    <Comment
                        key={comment.id}
                        comment={comment}
                        onDescriptionChange={(newDescription?: string) => onDescriptionChange(comment?.id, newDescription)}
                        onDeleteComment={(commentId?: string) => onDeleteComment(commentId)}
                    />
                </>
            ))}
        </div>
    )
}