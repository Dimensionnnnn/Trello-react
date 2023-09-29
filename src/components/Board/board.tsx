import { Column } from "components/column/column";
import React, { useState } from "react";
import styles from "./board.module.scss";
import { columns as columnsData, cards , comments } from "data/data";
import { CardProps } from "components/column/column";
import { Card as ICard } from "types/types";
import { Column as IColumn } from "types/types";

export const Board: React.FC = () => {
    const [columns, setColumns] = useState<{[id:string]: IColumn}>(columnsData);

    const getInitialCardsToCurrentColumn = (columnId: string) => {
        return Object.values(cards).reduce((acc: CardProps, card: ICard) => {
            if (card.columnId === columnId) {
                acc[card.id] = card;
            }
            return acc;
        }, {});
    }

    const handleColumnTitleChange = (id: string, newTitle: string) => {
        setColumns((prevColumns) => ({
            ...prevColumns,
            [id]: {
                ...prevColumns[id],
                title: newTitle,
            }
        }))
    };

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
                    />
                ))}
            </div>
        </div>
    )
};