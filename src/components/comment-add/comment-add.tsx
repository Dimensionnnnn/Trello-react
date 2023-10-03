import React, {useState} from "react";
import styles from "./comment-add.module.scss";
import { AddItem } from "components/UI/add-item/add-item";

interface Props {
    cardId?: string;
    onAddComment: (newComment?: string, cardId?: string) => void;
}

export const CommentAdd: React.FC<Props> = ({cardId, onAddComment}) => {
    const [isAddingComment, setIsAddingComment] = useState(false);

    const handleAddingCommentClick = () => {
        setIsAddingComment(true);
    }

    return (
        <>
            {isAddingComment ? (
                <>
                    <AddItem
                        onClose={() => setIsAddingComment(false)}
                        onAddItem={(newItemValue) => onAddComment(newItemValue, cardId)}
                    />
                </>
            ) : (
                <div className={styles.text} onClick={handleAddingCommentClick}>Write your comment...</div>
            )}
        </>
    )
};
