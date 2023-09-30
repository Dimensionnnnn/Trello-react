import { TextArea } from "components/UI/text-area/text-area";
import React, { useState } from "react";
import styles from "./card.module.scss";
import { Card as ICard } from "types/types";

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

    useEffect(() => {
        if (isOpen && textAreaRef.current) {
            textAreaRef.current.focus();
            textAreaRef.current.setSelectionRange(
                card.title.length,
                card.title.length
            )
        }
    }, [isOpen, card.title]);

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
        setIsEditing(false);
        onClose();
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            setIsEditing(false);
            onClose();
        } else if (e.key === "Escape") {
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
                <div className={styles.card} onClick={handleClick}>
                    {card.title}
                </div>
            )}
        </div>
    );
    onTextChange: (newText: string) => void;
}

export const Card: React.FC<Props> = ({card, onTextChange}) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className={styles.container}>
            {isEditing ? (
                <TextArea
                    value={card.title}
                    onChange={(e) => onTextChange(e.target.value)}
                    onBlur={() => setIsEditing(false)}
                />
            ) : (
                <div className={styles.card} onClick={() => setIsEditing(true)}>{card.title}</div>
            )}
        </div>
    )
};