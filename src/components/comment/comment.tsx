import React, {useState, useRef} from "react";
import { Comment as IComment } from "types/types";
import styles from "./comment.module.scss";
import { useFocusAndSelect } from "hooks/useFocusAndSelect";
import { TextArea } from "components/UI/text-area/text-area";
import { Button } from "components/UI/button/button";
import { SvgEdit } from "shared/icons/components/edit-svg";
import { SvgDelete } from "shared/icons/components/delete-svg";

interface Props {
    comment: IComment;
    onDescriptionChange: (newDescription?: string) => void;
    onDeleteComment: (commentId?: string) => void;
}

export const Comment: React.FC<Props> = ({comment, onDescriptionChange, onDeleteComment}) => {
    const [commentIdEditinig, setCommentIdEdit] = useState<string | null>(null);

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useFocusAndSelect({
        ref: textAreaRef,
        condition: commentIdEditinig === comment.id,
        value: comment.description
    })
    
    const handleKeyDown = (e: React.KeyboardEvent) => {
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
        <article className={styles.root}>
            {commentIdEditinig ? (
                <TextArea
                    ref={textAreaRef}
                    value={comment.description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
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
                            onClick={() => onDeleteComment(comment.id)}
                        >
                            <SvgDelete/>
                        </Button>
                    </div>
                </>
            )}
        </article>
    )
}