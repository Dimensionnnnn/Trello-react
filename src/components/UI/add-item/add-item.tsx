import { Button } from "components/UI/button/button";
import { TextArea } from "components/UI/text-area/text-area"
import { useFocusAndSelect } from "hooks/useFocusAndSelect";
import React, { useRef, useState } from "react";
import styles from "./add-item.module.scss";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onAddItem: (newItemValue: string) => void;
    children: React.ReactNode;
}

export const AddItem: React.FC<Props> = ({ isOpen, onClose, onAddItem, children }) => {
    const [newValue, setNewValue] = useState('');
    const trimmedValue = newValue.trim();
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useFocusAndSelect({
        ref: textAreaRef,
        condition: isOpen,
        value: newValue
    })

    const handleKeyDown = (e: React.KeyboardEvent) => {
        e.stopPropagation();
        if (e.key === "Escape") {
            onClose();
        } else if (e.key === "Enter") {
            addItem();
            onClose();
        }
    }

    const addItem = () => {
        if (trimmedValue) {
            onAddItem(trimmedValue);
            setNewValue('');
            onClose()
        }
    }

    const handleBlur = (e: React.FocusEvent) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            onClose();
        }
    }

    return (
        <>
            {isOpen ? (
                <form className={styles.wrapper} onSubmit={addItem} onBlur={handleBlur}>
                    <TextArea
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        ref={textAreaRef}
                        placeholder="Enter something..."
                    />

                    <Button
                        disabled={!trimmedValue}
                        type='submit'
                    >
                        Add
                    </Button>
                </form>
            ) : (
                children
            )}
        </>
    )
}