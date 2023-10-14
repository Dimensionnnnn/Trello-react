import {} from 'hooks/useFocusAndSelect';
import React from 'react';

import { CommentsList } from 'components/comments-list/comments-list';
import { AddItem } from 'components/UI/add-item/add-item';
import { Button } from 'components/UI/button/button';
import { EditableText } from 'components/UI/editable-text/editable-text';
import { Popup } from 'components/UI/popup/popup';
import {
    updateCardDescription,
    updateCardTitle,
} from 'redux/ducks/cards/cards-slice';
import { getCardById } from 'redux/ducks/cards/selectors';
import { addComment } from 'redux/ducks/comments/comments-slice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import { SvgClose } from 'shared/icons/components/close-svg';
import { Comment } from 'types/types';
import { v4 as uuidv4 } from 'uuid';

import styles from './popup-card.module.scss';

export interface CommentProps {
    [id: string]: Comment;
}

interface Props {
    activeCardId: string | null;
    isOpen: boolean;
    onClose: () => void;
}

export const PopupCard: React.FC<Props> = ({
    activeCardId,
    isOpen,
    onClose,
}) => {
    const activeCard = useAppSelector((state: RootState) =>
        getCardById(state, activeCardId ?? ''),
    );
    const username = useAppSelector((state: RootState) => state.username);

    const dispatch = useAppDispatch();

    const handleUpdateCardTitle = (cardId?: string, newTitle?: string) => {
        if (cardId && newTitle) {
            dispatch(updateCardTitle({ id: cardId, title: newTitle }));
        }
    };

    const handleUpdateCardDescription = (
        cardId?: string,
        newDescription?: string,
    ) => {
        if (cardId && newDescription) {
            dispatch(
                updateCardDescription({
                    id: cardId,
                    description: newDescription,
                }),
            );
        }
    };
    const handleAddComment = (
        newCommentDescription: string,
        cardId?: string,
    ) => {
        if (cardId) {
            const newComment: Comment = {
                id: uuidv4(),
                cardId: cardId,
                description: newCommentDescription,
                author: username,
                createdAt: new Date().toISOString(),
            };

            dispatch(addComment(newComment));
        }
    };

    return (
        <Popup isOpen={isOpen} onClose={onClose}>
            <h2>Карточка</h2>

            <EditableText
                value={activeCard?.title}
                onChange={(value) =>
                    handleUpdateCardTitle(activeCard?.id, value)
                }
            />

            <h3>Описание</h3>
            <EditableText
                value={activeCard?.description}
                onChange={(value) =>
                    handleUpdateCardDescription(activeCard?.id, value)
                }
            />

            <h3>Комментарии</h3>

            <AddItem
                onAddItem={(newItemValue) =>
                    handleAddComment(newItemValue, activeCard?.id)
                }
            />

            <CommentsList cardId={activeCard?.id} />

            <div className={styles.close}>
                <Button onClick={onClose}>
                    <SvgClose />
                </Button>
            </div>
        </Popup>
    );
};
