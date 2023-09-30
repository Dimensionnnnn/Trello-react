import React, { useState } from "react";
import styles from "./title-edit.module.scss";
import { TextArea } from "components/UI/text-area/text-area";

interface Props { 
    title: string;
    onTitleChange: (newTitle: string) => void;
}

export const TitleEdit: React.FC<Props> = ({title, onTitleChange}) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);

    return (
        <>
            {isEditingTitle ? (
                <TextArea
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    onBlur={() => setIsEditingTitle(false)}
                />
            ): (
                <h2 className={styles.title} onClick={() => setIsEditingTitle(true)}>{title}</h2>
            )}
        </>
    )
}