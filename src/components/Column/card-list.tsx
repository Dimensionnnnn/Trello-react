import React, { useState } from "react";
import { Card } from "components/card/card";
import { Card as ICard } from "types/types";

interface Props {
    cards: Record<string, ICard>;
    onCardTextChange: (id: string, newTitle: string) => void;
    onCardClick: (cardId: string | null) => void;
}

export const CardList: React.FC<Props> = ({ cards, onCardTextChange, onCardClick }) => {
    const [openItemId, setOpenItemId] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleClick = (e: React.MouseEvent, cardId: string) => {
        if (!isEditing) {
            const isClickInside = e.target === e.currentTarget;
            if (isClickInside) {
                setOpenItemId(cardId)
            }
        }
    }

    const handleBlur = () => {
        setIsEditing(false);
        setOpenItemId(null)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === "Escape") {
            setIsEditing(false);
            setOpenItemId(null)
        }
    }

    return (
        <>
            {Object.values(cards).map((card) => (
                <Card
                    key={card.id}
                    card={card}
                    isOpen={openItemId === card.id}
                    isEditing={isEditing}
                    onTextChange={(newText: string) => onCardTextChange(card.id, newText)}
                    onBlur={() => handleBlur()}
                    onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e)}
                    onClick={(e: React.MouseEvent, cardId: string) => handleClick(e, cardId)}
                    onCardClick={onCardClick}
                />
            ))}
        </>
    )
}