import { Popup } from "components/UI/popup/popup";
import {} from "hooks/useFocusAndSelect";
import { Card } from "types/types";
import { Comment } from "types/types";
import { Button } from "components/UI/button/button";
import { EditableText } from "components/UI/editable-text/editable-text";
import { SvgClose } from "shared/icons/components/close-svg";
import styles from "./popup-card.module.scss";
import { CommentsList } from "components/comments-list/comments-list";
import { CommentAdd } from "components/comment-add/comment-add";

export interface CommentProps {
    [id: string]: Comment;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    card?: Card;
    comments?: CommentProps;
    onCardTextChange: (id?: string, newTitle?: string) => void;
    onDescriptionChange: (id?: string, newDescription?: string) => void;
    onAddComment: (newComment?: string, cardId?: string) => void;
    onDeleteComment: (commentId?: string) => void;
    onCommentDescriptionChange: (commentId?: string, newDescription? : string) => void;
}

export const PopupCard: React.FC<Props> = ({
    isOpen,
    onClose,
    card,
    comments,
    onCardTextChange,
    onDescriptionChange,
    onAddComment,
    onDeleteComment,
    onCommentDescriptionChange,
}) => {
    return (
        <Popup isOpen={isOpen} onClose={onClose}>
            <h2>Карточка</h2>

            <EditableText
                value={card?.title}
                onChange={(value) => onCardTextChange(card?.id, value)}
            />

            <h3>Описание</h3>
            <EditableText
                value={card?.description}
                onChange={(value) => onDescriptionChange(card?.id, value)}
            />

            <h3>Комментарии</h3>

            <CommentAdd
                cardId={card?.id}
                onAddComment={onAddComment}
            />

            <CommentsList 
                comments={comments}
                onDescriptionChange={onCommentDescriptionChange}
                onDeleteComment={onDeleteComment}
            />

            <div className={styles.close}>
                <Button onClick={onClose}>
                    <SvgClose />
                </Button>
            </div>
        </Popup>
    );
};
