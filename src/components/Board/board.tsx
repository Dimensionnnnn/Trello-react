import { Column } from "components/column/column";
import React, { useState } from "react";
import styles from "./board.module.scss";
import { columns as columnsData, cards , comments } from "data/data";
import { CardProps } from "components/column/column";
import { Card as CardType } from "types/types";

export const Board: React.FC = () => {
    const initialColumns = Object.values(columnsData).map((column) => ({
        id: column.id,
        title: column.title,
        cards: Object.values(cards).reduce((acc: CardProps, card: CardType) => {
            if (card.columnId === column.id) {
                acc[card.id] = card;
            }
            return acc;
        }, {}),
    }));

    const [columns, setColumns] = useState(initialColumns);
    console.log(columns)

    const handleColumnTitleChange = (id: number, newTitle: string) => {
        setColumns((prevColumns) => {
            const updatedColumns = prevColumns.map((column) => {
                if (column.id === id) {
                    return {
                        ...column,
                        info: { ...column, title: newTitle },
                    };
                }
                return column;
            });
            return updatedColumns;
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {columns.map((column) => (
                    <Column
                        key={column.id}
                        id={column.id}
                        title={column.title}
                        cards={column.cards}
                        onTitleChange={(newTitle: string) => handleColumnTitleChange(column.id, newTitle)}
                    />
                ))}
            </div>
        </div>
    )
};