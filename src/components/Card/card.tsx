import { TextArea } from "components/UI/text-area/text-area";
import React, { useRef, useState } from "react";
import styles from "./card.module.scss";
import { Card as ICard } from "types/types";
import { useFocusAndSelect } from "hooks/useFocusAndSelect";

interface Props {
    card: ICard;
    isOpen: boolean;
    isEditing: boolean;
    onTextChange: (newText: string) => void;
    onBlur: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    onClick: (e: React.MouseEvent, cardId: string) => void;
    onCardClick: (card: ICard) => void;
}

export const Card: React.FC<Props> = ({ card, isOpen, isEditing, onTextChange, onBlur, onKeyDown, onClick, onCardClick }) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useFocusAndSelect({ref: textAreaRef, condition: isOpen, value: card.title});

    return (
        <>
            <div className={styles.container}>
                <div className={styles.card} onClick={() => onCardClick(card)}>{card.title}</div>
            </div>
        </>
    )
};