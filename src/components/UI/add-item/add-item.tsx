import { Button } from "components/UI/button/button";
import { TextArea } from "components/UI/text-area/text-area"
import React, { useState } from "react";
import styles from "./add-item.module.scss";
import { useForm } from 'react-hook-form';
import { validateNotEmptyField } from "redux/ducks/validation";

interface Props {
    onAddItem: (newItemValue: string) => void;
}

export interface FormProps {
    newItemValue: string;
}

export const AddItem: React.FC<Props> = ({ onAddItem }) => {
    const [isAddingItem, setIsAddingItem] = useState(false);
    const { handleSubmit, register, reset, formState: { errors } } = useForm<FormProps>();

    const onSubmit = (data: FormProps) => {
        onAddItem(data.newItemValue);
        reset();
        onClose();
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        e.stopPropagation();
        if (e.key === "Escape") {
            onClose();
            reset();
        } else if (e.key === "Enter") {
            handleSubmit(onSubmit)();
            onClose();
        }
    }

    const handleBlur = (e: React.FocusEvent) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            onClose();
            reset();
        }
    }

    const onClose = () => {
        setIsAddingItem(false);
    }

    return (
        <>
            {isAddingItem ? (
                <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)} onBlur={handleBlur} noValidate>
                    <TextArea
                        placeholder="Enter something..."
                        onKeyDown={handleKeyDown}
                        {...register('newItemValue', {
                            validate: (value) => validateNotEmptyField(value),
                        })}
                    />
                    {errors.newItemValue && <span className={styles.error}>{errors.newItemValue.message}</span>}
                    <Button type='submit'>
                        Add
                    </Button>
                </form>
            ) : (
                <Button onClick={() => setIsAddingItem(true)}>
                    Add item
                </Button>
                )}
        </>
    )
}