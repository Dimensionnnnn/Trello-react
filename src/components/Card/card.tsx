import { TextArea } from "components/UI/text-area/text-area";
import React, { useRef } from "react";
import styles from "./card.module.scss";
import { Card as ICard } from "types/types";
import { useFocusAndSelect } from "hooks/useFocusAndSelect";
import { Popup } from "components/UI/popup/popup";

interface Props {
    card: ICard;
    isOpen: boolean;
    isEditing: boolean;
    onTextChange: (newText: string) => void;
    onBlur: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    onClick: (e: React.MouseEvent, cardId: string) => void;
    isPopupOpen: boolean;
    onPopupOpen: (isPopupOpen: boolean) => void;
}

export const Card: React.FC<Props> = ({card, isOpen, isEditing, onTextChange, onBlur, onKeyDown, onClick, isPopupOpen, onPopupOpen}) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useFocusAndSelect({ref: textAreaRef, condition: isOpen, value: card.title});

    return (
        <div className={styles.container}>
            {isPopupOpen ? (
                <>
                    <div className={styles.card}>{card.title}</div>
                    <Popup
                        isActive={isPopupOpen}
                        setActive={onPopupOpen}
                    >
                        {isOpen || isEditing ? (
                            <TextArea
                                ref={textAreaRef}
                                value={card.title}
                                onChange={(e) => onTextChange(e.target.value)}
                                onBlur={onBlur}
                                onKeyDown={onKeyDown}
                            />
                        ) : (
                            <div className={styles.card} onClick={(e: React.MouseEvent) => onClick(e, card.id)}>{card.title}</div>
                        )}
                    </Popup>
                </>
            ) : (
                <div className={styles.card} onClick={() => onPopupOpen(true)}>{card.title}</div>
            )}
        </div>
    )
};