import React, { useState } from "react";
import { Button } from "components/UI/button/button";
import { AddItem } from "components/add-item/add-item";

interface Props {
    columnId: string;
    onAddCard: (newCardTitle: string, columnId: string) => void;
}

export const CardAdd: React.FC<Props> = ({ columnId, onAddCard }) => {
    const [isAddingCard, setIsAddingCard] = useState(false);

    const handleAddingCardClick = () => {
        setIsAddingCard(true);
    }

    return (
        <>
            {isAddingCard ? (
                <AddItem
                    onClose={() => setIsAddingCard(false)}
                    onAddItem={(newItemValue) => onAddCard(newItemValue, columnId)}
                />
            ) : (
                <Button
                    onClick={handleAddingCardClick}
                >
                    Add card
                </Button>
            )}
        </>
    )
}