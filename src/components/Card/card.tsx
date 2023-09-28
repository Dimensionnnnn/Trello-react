import { TextArea } from "components/UI/TextArea/text-area";
import React, { useState } from "react";
import styles from "./card.module.scss";
import sharedStyles from "../../assets/shared.module.scss";

interface Props {
    text?: string;
    onTextChange: (newText: string) => void;
}

export const Card: React.FC<Props> = ({text, onTextChange}) => {
    const [isEditing, setIsEditing] = useState(false);
    return (
        <>
            <div className={sharedStyles.cardContainer}>
                {isEditing ? (
                    <TextArea
                        value={text}
                        onChange={(e) => onTextChange(e.target.value)}
                        onBlur={() => setIsEditing(false)}
                    />
                ) : (
                    <div className={styles.card} onClick={() => setIsEditing(true)}>{text}</div>
                )}
            </div>
        </>
    )
};