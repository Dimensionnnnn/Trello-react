import { TextArea } from "components/UI/text-area/text-area";
import React, { useState } from "react";
import styles from "./card.module.scss";

export type CardProps = {
    id: number;
    title?: string;
    comment?: string;
}

interface Props {
    card: CardProps;
    onTextChange: (newText: string) => void;
}

export const Card: React.FC<Props> = ({card, onTextChange}) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className={styles.container}>
            {isEditing ? (
                <TextArea
                    value={card.title}
                    onChange={(e) => onTextChange(e.target.value)}
                    onBlur={() => setIsEditing(false)}
                />
            ) : (
                <div className={styles.card} onClick={() => setIsEditing(true)}>{card.title}</div>
            )}
        </div>
    )
};