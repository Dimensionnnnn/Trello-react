import { Column } from "components/column/column";
import React, { useState } from "react";
import styles from "./board.module.scss";
import { Card as CardType } from "types/types";
import { Column as ColumnType } from "types/types";

interface Props {
    columnsProps: {
        info: ColumnType;
        cards: CardType[];
    }[];
}

export const Board: React.FC<Props> = ({columnsProps}) => {
    const [columns, setColumns] = useState(columnsProps);

    const handleColumnTitleChange = (id: number, newTitle: string) => {
        setColumns((prevColumns) => {
            const updatedColumns = prevColumns.map((column) => {
                if (column.info.id === id) {
                    return {
                        ...column,
                        info: { ...column.info, title: newTitle },
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
                        key={column.info.id}
                        title={column.info.title}
                        cards={column.cards}
                        onTitleChange={(newTitle: string) => handleColumnTitleChange(column.info.id, newTitle)}
                    />
                ))}
            </div>
        </div>
    )
};