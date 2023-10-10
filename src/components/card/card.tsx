import { TextArea } from "components/UI/text-area/text-area";
import React, { useRef, useState } from "react";
import styles from "./card.module.scss";
import { Card as ICard } from "types/types";
import { useFocusAndSelect } from "hooks/useFocusAndSelect";
import { Button } from "components/UI/button/button";
import { SvgEdit } from "shared/icons/components/edit-svg";
import { SvgDelete } from "shared/icons/components/delete-svg";
import { deleteCard, updateCardTitle } from "redux/ducks/cards/cards-slice";
import { getCommentsCountByCardId } from "redux/ducks/comments/selectors";
import { RootState, useAppDispatch, useAppSelector } from "redux/store";

interface Props {
    card: ICard;
    onCardClick: (cardId: string | null) => void;
}

export const Card: React.FC<Props> = ({
    card,
    onCardClick,
}) => {
    const [activeCardIdEditing, setActiveCardIdEditing] = useState<string | null>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const dispatch = useAppDispatch();
    
    const commentsCount = useAppSelector((state: RootState) => getCommentsCountByCardId(state, card.id));
    const hasComments = commentsCount > 0;

    const handleDeleteCard = (cardId: string) => {
        dispatch(deleteCard(cardId));
    }

    const handleUpdateCardTitle = (cardId: string, newTitle: string) => {
        dispatch(updateCardTitle({id: cardId, title: newTitle}));
    }

    useFocusAndSelect({
        ref: textAreaRef,
        condition: activeCardIdEditing === card.id,
        value: card.title,
    });

    const handleBlur = () => {
        setActiveCardIdEditing(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === "Escape") {
            setActiveCardIdEditing(null);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {activeCardIdEditing ? (
                    <TextArea
                        key={card.id}
                        ref={textAreaRef}
                        value={card.title}
                        onChange={(e) => handleUpdateCardTitle(card.id, e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                    />
                ) : (
                    <>
                        <p
                            className={styles.card}
                            onClick={() => onCardClick(card.id)}
                        >
                            {card.title}
                        </p>

                        <div>
                            <Button
                                onClick={() => setActiveCardIdEditing(card.id)}
                            >
                                <SvgEdit />
                            </Button>

                            <Button onClick={() => handleDeleteCard(card.id)}>
                                <SvgDelete />
                            </Button>
                        </div>
                    </>
                )}
            </div>

            {hasComments && (
                <p className={styles.commentsCount}>
                    Comments: {commentsCount}
                </p>
            )}
        </div>
    );
};
