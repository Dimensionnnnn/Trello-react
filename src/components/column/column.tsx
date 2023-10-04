import { Card as ICard } from "types/types";
import React, {useState} from "react";
import styles from "./column.module.scss";
import { CardList } from "../card-list/card-list";
import { TitleEdit } from "components/UI/title-edit/title-edit";
import { AddItem } from "components/UI/add-item/add-item";
import { Button } from "components/UI/button/button";

export interface CardProps {
    [id: string]: ICard;
}

interface Props {
    id: string;
    title: string;
    cards: CardProps;
    onTitleChange: (newTitle: string) => void;
    onAddCard: (newCardTitle: string, columnId: string) => void;
    onDeleteCard: (cardId: string) => void;
    onCardTextChange: (id: string, newTitle: string) => void;
    onCardClick: (cardId: string | null) => void;
    getCommentsCountByCardId: (cardId: string) => number;
}

export const Column: React.FC<Props> = ({
    id,
    title,
    cards,
    onTitleChange,
    onAddCard,
    onDeleteCard,
    onCardTextChange,
    onCardClick,
    getCommentsCountByCardId
}) => {
    const [isAddingCard, setIsAddingCard] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <TitleEdit title={title} onTitleChange={onTitleChange} />
                </div>

                <div className={styles.cards}>
                    <CardList
                        cards={cards}
                        onCardTextChange={onCardTextChange}
                        onCardClick={onCardClick}
                        onDeleteCard={onDeleteCard}
                        getCommentsCountByCardId={getCommentsCountByCardId}
                    />
                </div>

                <AddItem
                    isOpen={isAddingCard}
                    onClose={() => setIsAddingCard(false)}
                    onAddItem={(newItemValue) => onAddCard(newItemValue, id)}
                >
                    <Button onClick={() => setIsAddingCard(true)}>Add card</Button>
                </AddItem>
            </div>
        </div>
    );
};

