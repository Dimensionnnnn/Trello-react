import { Card } from "components/card/card";
import { Card as CardType } from "types/types";
import { Button } from "components/UI/button/button";
import { Input } from "components/UI/input/input";
import { TextArea } from "components/UI/text-area/text-area";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import styles from "./column.module.scss";

interface Props {
    title: string;
    cards: CardType[];
    onTitleChange: (newTitle: string) => void;
}

export const Column: React.FC<Props> = ({title, onTitleChange, ...props}) => {
    const [cards, setCards] = useState<CardType[]>(props.cards);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState('');

    const handleAddCard = () => {
        const trimmedCardTitle = newCardTitle.trim();

        if (trimmedCardTitle) {
            const newCard: CardType = {
                id: uuidv4(),
                title: trimmedCardTitle,
                comment: ''
            }

            setCards([...cards, newCard]);
            setNewCardTitle('');
            setIsAddingCard(false);
        }
    }

    const handleCardTextChange = (id: string, newTitle: string) => {
        const updatedCards = cards.map((card) => {
            if (card.id === id) {
                return {
                    ...card,
                    title: newTitle
                };
            }
            return card;
        });

        setCards(updatedCards);
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    {isEditingTitle ? (
                        <Input
                            type='text'
                            value={title}
                            onChange={(e) => onTitleChange(e.target.value)}
                            onBlur={() => setIsEditingTitle(false)}
                        />
                    ): (
                        <h2 className={styles.title} onClick={() => setIsEditingTitle(true)}>{title}</h2>
                    )}
                </div>
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        card={{...card}}
                        onTextChange={(newText: string) => handleCardTextChange(card.id, newText)}
                    />
                ))}
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
            </div>
        </div>
    )
};
