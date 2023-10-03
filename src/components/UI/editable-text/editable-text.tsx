import { TextArea } from 'components/UI/text-area/text-area';
import { useFocusAndSelect } from 'hooks/useFocusAndSelect';
import styles from './editable-text.module.scss';
import React, { useRef } from 'react';

interface Props {
    value?: string;
    onChange: (value?: string ) => void;
}

export const EditableText: React.FC<Props> = ({value, onChange }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useFocusAndSelect({
        ref: textAreaRef,
        condition: isEditing,
        value: value
    })

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === "Escape") {
            onClose()
        }
    }

    const onClick = () => {
        setIsEditing(true);
    }

    const onClose = () => {
        setIsEditing(false);
    }

    return (
        <>
            {isEditing ? (
                <TextArea
                    ref={textAreaRef}
                    value={value}
                    onChange={() => onChange(textAreaRef.current?.value)}
                    onBlur={onClose}
                    onKeyDown={handleKeyDown}
                />
            ) : (
                <div onClick={onClick} className={styles.text}>
                    {value ? value : "Нажмите для редактирования"}
                </div>
            )}
        </>
    )
}