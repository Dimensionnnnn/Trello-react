import React, { useState } from "react";
import { Card } from "components/card/card";
import { Card as ICard } from "types/types";

interface Props {
    cards: Record<string, ICard>;
    onCardTextChange: (id: string, newTitle: string) => void;
}

export const CardList: React.FC<Props> = ({ cards, onCardTextChange }) => {
    const [openItemId, setOpenItemId] = useState<string | null>(null);

    return (
        <>
            {Object.values(cards).map((card) => (
                <Card
                    key={card.id}
                    card={card}
                    isOpen={openItemId === card.id}
                    onTextChange={(newText: string) => onCardTextChange(card.id, newText)}
                    onOpen={() => setOpenItemId(card.id)}
                    onClose={() => setOpenItemId(null)}
                />
            ))}
        </>
    )
}