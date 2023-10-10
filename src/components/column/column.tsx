import { Card as ICard } from "types/types";
import React  from "react";
import styles from "./column.module.scss";
import { CardList } from "../card-list/card-list";
import { TitleEdit } from "components/UI/title-edit/title-edit";
import { AddItem } from "components/UI/add-item/add-item";
import { updateColumnTitle } from "redux/ducks/columns/columns-slice";
import { RootState } from "redux/store";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { addCard } from "redux/ducks/cards/cards-slice";
import { v4 as uuidv4 } from "uuid";

export interface CardProps {
    [id: string]: ICard;
}

interface Props {
    id: string;
    onCardClick: (cardId: string | null) => void;
}

export const Column: React.FC<Props> = ({
    id,
    onCardClick,
}) => {
    const dispatch = useAppDispatch();
    const columnTitle = useAppSelector((state: RootState) => state.columns[id].title);

    const handleColumnTitleChange = (newTitle: string) => {
        dispatch(updateColumnTitle({id, title: newTitle}));
    }

    const handleAddCard = (newCardTitle: string, columnId: string) => {
        const newCard: ICard = {
            id: uuidv4(),
            columnId: columnId,
            title: newCardTitle,
            description: "",
        }
        dispatch(addCard(newCard));
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <TitleEdit title={columnTitle} onTitleChange={handleColumnTitleChange} />
                </div>

                <div className={styles.cards}>
                    <CardList
                        columnId={id}
                        onCardClick={onCardClick}
                    />
                </div>

                <AddItem
                    onAddItem={(newItemValue) => handleAddCard(newItemValue, id)}
                />
            </div>
        </div>
    );
};

