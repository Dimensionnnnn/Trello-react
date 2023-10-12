import { Column } from "components/column/column";
import { Column as IColumn } from "types/types";
import { useState } from "react";
import styles from "./board.module.scss";
import { PopupCard } from "components/popup-card/popup-card";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { v4 as uuidv4 } from "uuid";
import { addColumn } from "redux/ducks/columns/columns-slice";
import { AddItem } from "components/UI/add-item/add-item";

export const Board = () => {
    const columns = useAppSelector((state) => state.columns);
    const [activeCardIdPopup, setActiveCardIdPopup] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    const handleAddColumn = (newColumnTitle: string) => {
        const newColumn: IColumn = {
            id: uuidv4(),
            title: newColumnTitle,
        }
        dispatch(addColumn(newColumn));
    }

    return (
        <main className={styles.container}>
            <section className={styles.wrapper}>
                {Object.values(columns).map((column) => (
                    <Column
                        key={column.id}
                        id={column.id}
                        onCardClick={setActiveCardIdPopup}
                    />
                ))}
            </section>
            <div className={styles.footer}>
                <h2 className={styles.title}>Add new column</h2>
                <AddItem
                    onAddItem={(newItemValue) => handleAddColumn(newItemValue)}
                />
            </div>
            <PopupCard
                activeCardId={activeCardIdPopup}
                isOpen={!!activeCardIdPopup}
                onClose={() => {setActiveCardIdPopup(null)}}
            />
        </main>
    );
};