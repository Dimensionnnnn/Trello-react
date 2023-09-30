import React, { useState, useRef, useEffect } from "react";
import styles from "./title-edit.module.scss";
import { TextArea } from "components/UI/text-area/text-area";
import { useFocusAndSelect } from "hooks/useFocusAndSelect";

interface Props { 
    title: string;
    onTitleChange: (newTitle: string) => void;
}

export const TitleEdit: React.FC<Props> = ({title, onTitleChange}) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useFocusAndSelect({ref: textAreaRef, condition: isEditingTitle, value: title});

    return (
        <>
            {isEditingTitle ? (
                <TextArea
                    value={title}
                    ref={textAreaRef}
                    onChange={(e) => onTitleChange(e.target.value)}
                    onBlur={() => setIsEditingTitle(false)}
                />
            ): (
                <h2 className={styles.title} onClick={() => setIsEditingTitle(true)}>{title}</h2>
            )}
        </>
    )
}