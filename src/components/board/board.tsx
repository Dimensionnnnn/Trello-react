import { Column } from "components/column/column";
import { useState } from "react";
import styles from "./board.module.scss";
import { PopupCard } from "components/popup-card/popup-card";
import { useAppSelector } from "redux/store";

export const Board = () => {
    const columns = useAppSelector((state) => state.columns);
    const [activeCardIdPopup, setActiveCardIdPopup] = useState<string | null>(null);

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
            <PopupCard
                activeCardId={activeCardIdPopup}
                isOpen={!!activeCardIdPopup}
                onClose={() => {setActiveCardIdPopup(null)}}
            />
        </main>
    );
};