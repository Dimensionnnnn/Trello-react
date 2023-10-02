import { TextArea } from 'components/UI/text-area/text-area';
import { useFocusAndSelect } from 'hooks/useFocusAndSelect';
import React, { useRef } from 'react';

interface Props {
    value?: string;
    isEditing: boolean;
    onChange: (value: string | undefined) => void;
    onClose: () => void;
    onClick: () => void;
}

export const EditableText: React.FC<Props> = ({value, isEditing, onChange, onClose, onClick}) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useFocusAndSelect({
        ref: textAreaRef,
        condition: isEditing,
        value: value
    })

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === "Escape") {
            onClose();
        }
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
                <div onClick={onClick}>
                    {value ? value : "Нажмите для редактирования"}
                </div>
            )}
        </>
    )
}