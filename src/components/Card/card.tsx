import { TextArea } from "components/UI/text-area/text-area";
import React, { useState, useRef, useEffect } from "react";
import styles from "./card.module.scss";
import { Card as ICard } from "types/types";
import { useFocusAndSelect } from "hooks/useFocusAndSelect";

interface Props {
    card: ICard;
    isOpen: boolean;
    onTextChange: (newText: string) => void;
    onOpen: () => void;
    onClose: () => void;
}

export const Card: React.FC<Props> = ({card, isOpen, onTextChange, onOpen, onClose}) => {
    const [isEditing, setIsEditing] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useFocusAndSelect({ref: textAreaRef, condition: isOpen, value: card.title});

    const handleClick = (e: React.MouseEvent) => {
        if (!isEditing) {
            const isClickInside = e.target === e.currentTarget;
            if (isClickInside) {
                onOpen();
            } else {
                onClose();
            }
        }
    }

    const handleBlur = () => {
        console.log(2)
        setIsEditing(false);
        onClose();
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === "Escape") {
            setIsEditing(false);
            onClose();
        }
    }

    return (
        <div className={styles.container}>
            {isOpen || isEditing ? (
                <TextArea
                    ref={textAreaRef}
                    value={card.title}
                    onChange={(e) => onTextChange(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                />
            ) : (
                <div className={styles.card} onClick={handleClick}>{card.title}</div>
            )}
        </div>
    )
};