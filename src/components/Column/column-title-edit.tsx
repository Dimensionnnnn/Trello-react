import React, { useState } from "react";
import { Input } from "components/UI/input/input";
import styles from "./column.module.scss";

interface Props { 
    title: string;
    onTitleChange: (newTitle: string) => void;
}

export const ColumnTitleEdit: React.FC<Props> = ({title, onTitleChange}) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);

    return (
        <div className={styles.header}>
            {isEditingTitle ? (
                <Input
                    type='text'
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    onBlur={() => setIsEditingTitle(false)}
                />
            ): (
                <h2 className={styles.title} onClick={() => setIsEditingTitle(true)}>{title}</h2>
            )}
        </div>
    )
}