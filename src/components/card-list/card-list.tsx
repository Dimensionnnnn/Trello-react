import React from "react";
import { Card } from "components/card/card";
import { RootState, useAppSelector } from "redux/store";
import { getCardsByColumnId } from "redux/ducks/cards/selectors";

interface Props {
    columnId: string;
    onCardClick: (cardId: string | null) => void;
}

export const CardList: React.FC<Props> = ({
    columnId,
    onCardClick,
}) => {
    const cards = useAppSelector((state: RootState) => getCardsByColumnId(state, columnId));
    return (
        <>
            {cards.map((card) => (
                <Card
                    key={card.id}
                    card={card}
                    onCardClick={onCardClick}
                />
            ))}
        </>
    );
};
