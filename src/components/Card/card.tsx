import { TextArea } from "components/UI/text-area/text-area";
import React, { useRef, useState } from "react";
import styles from "./card.module.scss";
import { Card as ICard } from "types/types";
import { useFocusAndSelect } from "hooks/useFocusAndSelect";
import { Button } from "components/UI/button/button";
import { SVGEdit } from "shared/icons/components/edit-svg";
import { SVGDelete} from "shared/icons/components/delete-svg";

interface Props {
    card: ICard;
    onTextChange: (newText: string) => void;
    onCardClick: (cardId: string | null) => void;
    onDeleteCard: (cardId: string) => void;
}

export const Card: React.FC<Props> = ({
    card,
    onTextChange,
    onCardClick,
    onDeleteCard,
}) => {
    const [activeCardIdEditing, setActiveCardIdEditing] = useState<string | null>(null);

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useFocusAndSelect({
        ref: textAreaRef,
        condition: activeCardIdEditing === card.id,
        value: card.title,
    });

    const handleBlur = () => {
        setActiveCardIdEditing(null);
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === "Escape") {
            setActiveCardIdEditing(null);
        }
    };

    return (
        <div className={styles.container}>
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
                    <div className={styles.card} onClick={() => onCardClick(card.id)}>
                        {card.title}
                    </div>

                    <Button
                        onClick={() => setActiveCardIdEditing(card.id)}
                    >
                        <SVGEdit />
                    </Button>

                    <Button
                        onClick={() => onDeleteCard(card.id)}
                    >
                        <SVGDelete />
                    </Button>
                </>
            )}
        </div>
    );
};
