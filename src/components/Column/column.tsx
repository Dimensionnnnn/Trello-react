import { Card as ICard } from "types/types";
import React from "react";
import styles from "./column.module.scss";
import { CardList } from "./card-list";
import { CardAdd } from "./card-add";
import { TitleEdit } from "components/UI/title-edit/title-edit";

export interface CardProps { [id: string]: ICard };

interface Props {
    id: string;
    title: string;
    cards: CardProps;
    onTitleChange: (newTitle: string) => void;
    onAddCard: (newCard: ICard) => void;
    onCardTextChange: (id: string, newTitle: string) => void;
}

export const Column: React.FC<Props> = ({...props}) => {
    const { id, title, cards, onTitleChange, onAddCard, onCardTextChange } = props;

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <TitleEdit title={title} onTitleChange={onTitleChange}/>
                </div>
                <CardList cards={cards} onCardTextChange={onCardTextChange}/>
                <CardAdd onAddCard={onAddCard} columnId={id}/>
            </div>
        </div>
    )
};
