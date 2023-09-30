import React from "react";
import { Card } from "components/card/card";
import { Card as ICard } from "types/types";

interface Props {
    cards: Record<string, ICard>;
    onCardTextChange: (id: string, newTitle: string) => void;
}

export const CardList: React.FC<Props> = ({ cards, onCardTextChange }) => {
    return (
        <>
            {Object.values(cards).map((card) => (
                <Card
                    key={card.id}
                    card={card}
                    onTextChange={(newText: string) => onCardTextChange(card.id, newText)}
                />
            ))}
        </>
    )
}