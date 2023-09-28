import { Column } from "components/Column/column";
import React, { useState } from "react";
import styles from "./board.module.scss";

interface Props {
    columnsProps: {
        id: number,
        title: string,
    }[];
}

export const Board: React.FC<Props> = ({columnsProps}) => {
    const [columnInfo, setColumnInfo] = useState(columnsProps);

    const handleColumnTitleChange = (id: number, newTitle: string) => {
        const updatedColumnTitles = [...columnInfo];
        updatedColumnTitles[id].title = newTitle;
        setColumnInfo(updatedColumnTitles);
    }

    return (
        <>
            <div className={styles.boardContainer}>
                <div className={styles.boardWrapper}>
                    {columnInfo.map((column) => (
                        <Column
                            key={column.id}
                            title={column.title}
                            onTitleChange={(newTitle: string) => handleColumnTitleChange(column.id, newTitle)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
};