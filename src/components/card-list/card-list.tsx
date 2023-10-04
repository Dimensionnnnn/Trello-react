import React from "react";
import { Card } from "components/card/card";
import { Card as ICard } from "types/types";

interface Props {
    cards: Record<string, ICard>;
    onCardTextChange: (id: string, newTitle: string) => void;
    onCardClick: (cardId: string | null) => void;
    onDeleteCard: (cardId: string) => void;
    getCommentsCountByCardId: (cardId: string) => number;
}

export const CardList: React.FC<Props> = ({
    cards,
    onCardTextChange,
    onCardClick,
    onDeleteCard,
    getCommentsCountByCardId
}) => {
    return (
        <>
            {Object.values(cards).map((card) => (
                <Card
                    key={card.id}
                    card={card}
                    onTextChange={(newText: string) => onCardTextChange(card.id, newText)}
                    onCardClick={onCardClick}
                    onDeleteCard={onDeleteCard}
                    commentsCount={getCommentsCountByCardId(card.id)}
                />
            ))}
        </>
    );
};
