import { Button } from "components/UI/button/button";
import { TextArea } from "components/UI/text-area/text-area"
import { useFocusAndSelect } from "hooks/useFocusAndSelect";
import React, { useRef, useState } from "react";
import styles from "./add-item.module.scss";
import { useForm, Controller } from 'react-hook-form';

interface Props {
    onAddItem: (newItemValue: string) => void;
}

interface FormProps {
    newItemValue: string;
}

export const AddItem: React.FC<Props> = ({ onAddItem }) => {
    const [isAddingItem, setIsAddingItem] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { handleSubmit, control, reset, formState: { errors } } = useForm<FormProps>();

    const onSubmit = (data: FormProps) => {
        onAddItem(data.newItemValue);
        reset();
        onClose();
    }

    useFocusAndSelect({
        ref: textAreaRef,
        condition: isAddingItem,
        value: ''
    })

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
                    <Controller
                        name='newItemValue'
                        control={control}
                        defaultValue=''
                        rules={{
                            validate: (value) => !!value.trim() ? true : 'Please enter something',
                        }}
                        render={({ field }) => (
                            <>
                                <TextArea
                                    value={field.value}
                                    onChange={field.onChange}
                                    onKeyDown={handleKeyDown}
                                    ref={textAreaRef}
                                    placeholder="Enter something..."
                                />
                                {errors.newItemValue && (
                                    <span className={styles.error}>
                                        {errors.newItemValue.message}
                                    </span>
                                )}
                            </>
                        )}
                    />

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