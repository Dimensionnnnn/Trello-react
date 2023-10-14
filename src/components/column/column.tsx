import React from 'react';

import { AddItem } from 'components/UI/add-item/add-item';
import { Button } from 'components/UI/button/button';
import { TitleEdit } from 'components/UI/title-edit/title-edit';
import { addCard } from 'redux/ducks/cards/cards-slice';
import { getCardsIdsByColumnId } from 'redux/ducks/cards/selectors';
import {
    deleteColumn,
    updateColumnTitle,
} from 'redux/ducks/columns/columns-slice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import { Card as ICard } from 'types/types';
import { v4 as uuidv4 } from 'uuid';

import styles from './column.module.scss';
import { CardList } from '../card-list/card-list';

export interface CardProps {
    [id: string]: ICard;
}

interface Props {
    id: string;
    onCardClick: (cardId: string | null) => void;
}

export const Column: React.FC<Props> = ({ id, onCardClick }) => {
    const dispatch = useAppDispatch();
    const columnTitle = useAppSelector(
        (state: RootState) => state.columns[id].title,
    );
    const cardsIdsByColumnId = useAppSelector((state: RootState) =>
        getCardsIdsByColumnId(state, id),
    );

    const handleColumnTitleChange = (newTitle: string) => {
        dispatch(updateColumnTitle({ id, title: newTitle }));
    };

    const handleAddCard = (newCardTitle: string, columnId: string) => {
        const newCard: ICard = {
            id: uuidv4(),
            columnId: columnId,
            title: newCardTitle,
            description: '',
        };
        dispatch(addCard(newCard));
    };

    const handleDeleteColumn = (columnId: string) => {
        dispatch(
            deleteColumn({ columnId: columnId, cardsIds: cardsIdsByColumnId }),
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <TitleEdit
                        title={columnTitle}
                        onTitleChange={handleColumnTitleChange}
                    />
                    <div>
                        <Button onClick={() => handleDeleteColumn(id)}>
                            Удалить
                        </Button>
                    </div>
                </div>

                <div className={styles.cards}>
                    <CardList columnId={id} onCardClick={onCardClick} />
                </div>

                <AddItem
                    onAddItem={(newItemValue) =>
                        handleAddCard(newItemValue, id)
                    }
                />
            </div>
        </div>
    );
};
