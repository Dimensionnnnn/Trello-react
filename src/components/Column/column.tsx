import { Card as ICard } from "types/types";
import React from "react";
import styles from "./column.module.scss";
import { CardList } from "../card-list/card-list";
import { CardAdd } from "../card-add/card-add";
import { TitleEdit } from "components/UI/title-edit/title-edit";

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
}) => {
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
                    />
                </div>

                <CardAdd onAddCard={onAddCard} columnId={id} />
            </div>
        </div>
    );
};
