import { useFocusAndSelect } from "hooks/useFocusAndSelect";
import React, {useState, useRef} from "react";
import styles from "./comment-add.module.scss";
import { TextArea } from "components/UI/text-area/text-area";
import { Button } from "components/UI/button/button";

interface Props {
    cardId?: string;
    onAddComment: (newComment?: string, cardId?: string) => void;
}

export const CommentAdd: React.FC<Props> = ({cardId, onAddComment}) => {
    const [isAddingComment, setIsAddingComment] = useState(false);
    const [newCommentDescription, setNewCommentDescription] = useState("");

    const trimmedDescription = newCommentDescription?.trim();

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useFocusAndSelect({
        ref: textAreaRef,
        condition: isAddingComment,
        value: newCommentDescription
    })

    const handleAddComment = () => {
        if (trimmedDescription) {
            onAddComment(trimmedDescription, cardId);
            setNewCommentDescription("");
            setIsAddingComment(false);
        }
    }

    const handleBlur = () => {
        setIsAddingComment(false);
    }

    const handleAddingCommentClick = () => {
        setIsAddingComment(true);
        setNewCommentDescription("");
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            setIsAddingComment(false);
        } else if (e.key === "Enter") {
            handleAddComment();
            setIsAddingComment(false);
        }
    }

    return (
        <>
            {isAddingComment ? (
                <>
                    <div className={styles.text}>
                        <TextArea
                            value={newCommentDescription}
                            onChange={(e) => setNewCommentDescription(e.target.value)}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            ref={textAreaRef}
                            placeholder="Enter a new comment..."
                        />
                    </div>

                    <Button
                        onMouseDown={handleAddComment}
                        disabled={!trimmedDescription}
                    >
                        Add comment
                    </Button>
                </>
            ) : (
                <div className={styles.text} onClick={handleAddingCommentClick}>Write your comment...</div>
            )}
        </>
    )
};
