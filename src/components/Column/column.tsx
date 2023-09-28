import { Card } from "components/Card/card";
import { Button } from "components/UI/Button/button";
import { Input } from "components/UI/Input/input";
import { TextArea } from "components/UI/TextArea/text-area";
import React, { useState } from "react";
import styles from "./column.module.scss";
import sharedStyles from "../../assets/shared.module.scss";

interface Props {
    title: string;
    onTitleChange: (newTitle: string) => void;
}

export const Column: React.FC<Props> = ({title, onTitleChange}) => {
    const [cards, setCards] = useState<string[]>([]);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [newCardText, setNewCardText] = useState('');

    const handleAddCard = () => {
        const trimmedCardText = newCardText.trim();

        if (trimmedCardText) {
            setCards([...cards, trimmedCardText]);
            setNewCardText('');
            setIsAddingCard(false);
        }
    }

    const handleCardTextChange = (index: number, newText: string) => {
        const updatedCards = [...cards];
        updatedCards[index] = newText;
        setCards(updatedCards);
    }

    return (
        <>
            <div className={styles.columnContainer}>
                <div className={styles.columnWrapper}>
                    <div className={styles.columnHeader}>
                        {isEditingTitle ? (
                            <Input
                                type='text'
                                value={title}
                                onChange={(e) => onTitleChange(e.target.value)}
                                onBlur={() => setIsEditingTitle(false)}
                                error=""
                            />
                        ): (
                            <h2 className={styles.columnTitle} onClick={() => setIsEditingTitle(true)}>{title}</h2>
                        )}
                    </div>
                    {cards.map((cardText, index) => (
                        <Card
                            key={index}
                            text={cardText}
                            onTextChange={(newText: string) => handleCardTextChange(index, newText)}
                        />
                    ))}
                    {!isAddingCard && (
                        <Button
                            text="Add card"
                            onClick={() => setIsAddingCard(true)}
                        />
                    )}
                    {isAddingCard && (
                        <>
                            <div className={sharedStyles.cardContainer}>
                                <TextArea
                                    value={newCardText}
                                    onChange={(e) => setNewCardText(e.target.value)}
                                />
                            </div>
                            <Button
                                text='Add card'
                                onClick={handleAddCard}
                                disabled={newCardText === ''}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    )
};
