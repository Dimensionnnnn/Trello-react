import { Card } from "components/card/card";
import { CardProps } from "components/card/card";
import { Button } from "components/UI/button/button";
import { Input } from "components/UI/input/input";
import { TextArea } from "components/UI/text-area/text-area";
import React, { useState } from "react";
import styles from "./column.module.scss";

interface Props {
    title: string;
    cards: CardProps[];
    onTitleChange: (newTitle: string) => void;
}

export const Column: React.FC<Props> = ({title, onTitleChange, ...props}) => {
    const [cards, setCards] = useState<CardProps[]>(props.cards);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState('');

    const handleAddCard = () => {
        const trimmedCardTitle = newCardTitle.trim();

        if (trimmedCardTitle) {
            const maxId = Math.max(...cards.map((card) => card.id), 0);
            const newCard: CardProps = {
                id: maxId + 1,
                title: trimmedCardTitle,
                comment: ''
            }

            setCards([...cards, newCard]);
            setNewCardTitle('');
            setIsAddingCard(false);
        }
    }

    const handleCardTextChange = (index: number, newTitle: string) => {
        const updatedCards = [...cards];
        updatedCards[index] = {
            ...updatedCards[index],
            title: newTitle
        }
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
                {cards.map((card, index) => (
                    <Card
                        key={card.id}
                        card={{...card}}
                        onTextChange={(newText: string) => handleCardTextChange(index, newText)}
                    />
                ))}
                {!isAddingCard ? (
                    <Button
                        text="Add card"
                        onClick={() => setIsAddingCard(true)}
                    />
                ) : (
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
                )}
            </div>
        </div>
    )
};
