import React, {useState, useRef} from "react";
import { Comment as IComment } from "types/types";
import styles from "./comment.module.scss";
import { useFocusAndSelect } from "hooks/useFocusAndSelect";
import { TextArea } from "components/UI/text-area/text-area";
import { Button } from "components/UI/button/button";
import { SvgEdit } from "shared/icons/components/edit-svg";
import { SvgDelete } from "shared/icons/components/delete-svg";
import { deleteComment, updateCommentDescription } from "redux/ducks/comments/comments-slice";
import { useAppDispatch } from "redux/store";

interface Props {
    comment: IComment;
}

export const Comment: React.FC<Props> = ({comment}) => {
    const [commentIdEditinig, setCommentIdEdit] = useState<string | null>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const dispatch = useAppDispatch();

    const handleDeleteComment = (commentId: string) => {
        dispatch(deleteComment(commentId));
    }

    const handleUpdateCommentDescription = (commentId: string, newDescription: string) => {
        dispatch(updateCommentDescription({id: commentId, description: newDescription}));
    }

    useFocusAndSelect({
        ref: textAreaRef,
        condition: commentIdEditinig === comment.id,
        value: comment.description
    })
    
    const handleKeyDown = (e: React.KeyboardEvent) => {
        e.stopPropagation();
        if (e.key === "Enter" || e.key === "Escape") {
            onClose();
        }
    }

    const onClose = () => {
        setCommentIdEdit(null);
    }

    const onClick = () => {
        setCommentIdEdit(comment.id);
    }

    return (
        <>
            <h4 className={styles.author}>Автор: {comment.author}</h4>
            <div className={styles.root}>
                {commentIdEditinig ? (
                    <TextArea
                        ref={textAreaRef}
                        value={comment.description}
                        onChange={(e) => handleUpdateCommentDescription(comment.id, e.target.value)}
                        onBlur={onClose}
                        onKeyDown={handleKeyDown}
                    />
                ) : (
                    <>
                        <p className={styles.text}>{comment.description}</p>

                        <div>
                            <Button
                                onClick={onClick}
                            >
                                <SvgEdit/>
                            </Button>

                            <Button
                                onClick={() => handleDeleteComment(comment.id)}
                            >
                                <SvgDelete/>
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}