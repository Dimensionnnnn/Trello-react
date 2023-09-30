import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "components/UI/button/button";
import { TextArea } from "components/UI/text-area/text-area";
import { Card as ICard } from "types/types";
import styles from "./column.module.scss";

interface Props {
    columnId: string;
    onAddCard: (newCard: ICard) => void;
}

export const CardAdd: React.FC<Props> = ({ columnId, onAddCard }) => {
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState('');

    const handleAddCard = () => {
        const trimmedCardTitle = newCardTitle.trim();

        if (trimmedCardTitle) {
            const newCardId = uuidv4();
            const newCard: ICard = {
                id: newCardId,
                columnId: columnId,
                title: trimmedCardTitle,
            }

            onAddCard(newCard);
            setNewCardTitle('');
            setIsAddingCard(false);
        }
    }

    return (
        <>
            {isAddingCard ? (
                <>
                    <div className={styles.text}>
                            <TextArea
                                value={newCardTitle}
                                onChange={(e) => setNewCardTitle(e.target.value)}
                            />
                    </div>
                    <Button
                                text='Add card'
                                onClick={handleAddCard}
                                disabled={!newCardTitle.trim()}
                    />
                </>
            ) : (
                <Button
                    text="Add card"
                    onClick={() => setIsAddingCard(true)}
                />
            )}
        </>
    )
}