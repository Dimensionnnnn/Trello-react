import { TextArea } from "components/UI/text-area/text-area";
import React, { useRef, useState } from "react";
import styles from "./card.module.scss";
import { Card as ICard } from "types/types";
import { useFocusAndSelect } from "hooks/useFocusAndSelect";
import { Button } from "components/UI/button/button";
import { SvgEdit } from "shared/icons/components/edit-svg";
import { SvgDelete } from "shared/icons/components/delete-svg";

interface Props {
    card: ICard;
    commentsCount: number;
    onTextChange: (newText: string) => void;
    onCardClick: (cardId: string | null) => void;
    onDeleteCard: (cardId: string) => void;
}

export const Card: React.FC<Props> = ({
    card,
    commentsCount,
    onTextChange,
    onCardClick,
    onDeleteCard,
}) => {
    const [activeCardIdEditing, setActiveCardIdEditing] = useState<string | null>(null);
    const hasComments = commentsCount > 0;

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
                        onChange={(e) => onTextChange(e.target.value)}
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

                            <Button onClick={() => onDeleteCard(card.id)}>
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
