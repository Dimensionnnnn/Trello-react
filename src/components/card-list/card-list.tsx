import React from "react";
import { Card } from "components/card/card";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { selectCardsByColumnId } from "redux/ducks/cards/selectors";

interface Props {
    columnId: string;
    onCardClick: (cardId: string | null) => void;
}

export const CardList: React.FC<Props> = ({
    columnId,
    onCardClick,
}) => {
    const cards = useSelector((state: RootState) => selectCardsByColumnId(state, columnId));
    return (
        <>
            {Object.values(cards).map((card) => (
                <Card
                    key={card.id}
                    card={card}
                    onCardClick={onCardClick}
                />
            ))}
        </>
    );
};
