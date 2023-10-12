import { Card as ICard } from "types/types";
import React  from "react";
import styles from "./column.module.scss";
import { CardList } from "../card-list/card-list";
import { TitleEdit } from "components/UI/title-edit/title-edit";
import { AddItem } from "components/UI/add-item/add-item";
import { deleteColumn, updateColumnTitle } from "redux/ducks/columns/columns-slice";
import { RootState } from "redux/store";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { addCard, deleteCard } from "redux/ducks/cards/cards-slice";
import { v4 as uuidv4 } from "uuid";
import { Button } from "components/UI/button/button";
import { getCardsByColumnId } from "redux/ducks/cards/selectors";

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
    const cardsByColumnId = useAppSelector((state: RootState) => getCardsByColumnId(state, id));

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

    const handleDeleteColumn = (columnId: string) => {
        cardsByColumnId.forEach((card) => {
            dispatch(deleteCard(card.id));
        })

        dispatch(deleteColumn(columnId));
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <TitleEdit title={columnTitle} onTitleChange={handleColumnTitleChange} />
                    <div>
                        <Button onClick={() => handleDeleteColumn(id)}>Удалить</Button>
                    </div>
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

