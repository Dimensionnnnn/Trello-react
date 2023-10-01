import { Column } from "components/column/column";
import React, { useState } from "react";
import styles from "./board.module.scss";
import { columns as columnsData, cards as cardsData , comments } from "data/data";
import { CardProps } from "components/column/column";
import { Card as ICard } from "types/types";
import { Column as IColumn } from "types/types";
import { PopupCard } from "components/popup-card/popup-card";
import { v4 as uuidv4 } from "uuid";

export const Board: React.FC = () => {
    const [columns, setColumns] = useState<Record<string, IColumn>>(columnsData);
    const [cards, setCards] = useState<Record<string, ICard>>(cardsData);

    const [activeCardIdPopup, setActiveCardIdPopup] = useState<string | null>(null);

    const getInitialCardsToCurrentColumn = (columnId: string) => {
        return Object.values(cards).reduce((acc: CardProps, card: ICard) => {
            if (card.columnId === columnId) {
                acc[card.id] = card;
            }
            return acc;
        }, {});
    }

    const handleColumnTitleChange = (id: string, newTitle: string) => {
        const columnsCopy = {...columns};
        columnsCopy[id].title = newTitle;
        setColumns(columnsCopy);
    };

    const handleAddCard = (newCardTitle: string, columnId: string) => {
        const newCard: ICard = {
            id: uuidv4(),
            columnId: columnId,
            title: newCardTitle,
            description: "",
        }

        const updatedCards = {...cards};
        updatedCards[newCard.id] = newCard;
        setCards(updatedCards);
    }

    const handleDeleteCard = (cardId: string) => {
        const updatedCards = {...cards};
        delete updatedCards[cardId];
        setCards(updatedCards);
    }

    const handleCardTextChange = (id: string | undefined, newTitle: string | undefined) => {
        if (id && newTitle) {
            const updatedCards = {...cards};
            updatedCards[id].title = newTitle;
            setCards(updatedCards);
        }
    }

    const handleCardDescriptionChange = (id: string | undefined, newDescription: string | undefined) => {
        if (id && newDescription) {
            const updatedCards = {...cards};
            updatedCards[id].description = newDescription;
            setCards(updatedCards);
        }
    }

    const getCardById = (cardId: string | null) => {
        if (cardId) {
            return cards[cardId];
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {Object.values(columns).map((column) => (
                    <Column
                        key={column.id}
                        id={column.id}
                        title={column.title}
                        cards={getInitialCardsToCurrentColumn(column.id)}
                        onTitleChange={(newTitle: string) => handleColumnTitleChange(column.id, newTitle)}
                        onAddCard={(newCardTitle: string, columnId: string) => handleAddCard(newCardTitle, columnId)}
                        onDeleteCard={handleDeleteCard}
                        onCardTextChange={handleCardTextChange}
                        onCardClick={setActiveCardIdPopup}
                    />
                ))}
            </div>
            <PopupCard
                isOpen={!!activeCardIdPopup}
                onClose={() => {setActiveCardIdPopup(null)}}
                card={getCardById(activeCardIdPopup)}
                onCardTextChange={handleCardTextChange}
                onDescriptionChange={handleCardDescriptionChange}
            />
        </div>
    );
};