import { Button } from "components/UI/button/button";
import { TextArea } from "components/UI/text-area/text-area"
import { useFocusAndSelect } from "hooks/useFocusAndSelect";
import { useRef, useState } from "react";
import styles from "./add-item.module.scss";

interface Props {
    onClose: () => void;
    onAddItem: (newItemValue: string) => void;
}

export const AddItem: React.FC<Props> = ({ onClose, onAddItem }) => {
    const [newValue, setNewValue] = useState('');
    const trimmedValue = newValue.trim();
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useFocusAndSelect({
        ref: textAreaRef,
        condition: true,
        value: newValue
    })

    const handleKeyDown = (e: React.KeyboardEvent) => {
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
    )
}