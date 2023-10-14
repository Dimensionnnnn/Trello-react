import React, { useRef, useState } from 'react';

import { Button } from 'components/UI/button/button';
import { TextArea } from 'components/UI/text-area/text-area';
import { useFocusAndSelect } from 'hooks/useFocusAndSelect';
import { useForm } from 'react-hook-form';
import { validateNotEmptyField } from 'redux/ducks/validation';

import styles from './add-item.module.scss';

interface Props {
    onAddItem: (newItemValue: string) => void;
}

export interface FormProps {
    newItemValue: string;
}

export const AddItem: React.FC<Props> = ({ onAddItem }) => {
    const [isAddingItem, setIsAddingItem] = useState(false);
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<FormProps>();
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const { ref } = register('newItemValue');

    useFocusAndSelect({
        ref: textAreaRef,
        condition: isAddingItem,
        value: '',
    });

    const onSubmit = (data: FormProps) => {
        onAddItem(data.newItemValue);
        reset();
        onClose();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        e.stopPropagation();
        if (e.key === 'Escape') {
            onClose();
            reset();
        } else if (e.key === 'Enter') {
            handleSubmit(onSubmit)();
            onClose();
        }
    };

    const handleBlur = (e: React.FocusEvent) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            onClose();
            reset();
        }
    };

    const onClose = () => {
        setIsAddingItem(false);
    };

    return (
        <>
            {isAddingItem ? (
                <form
                    className={styles.wrapper}
                    onSubmit={handleSubmit(onSubmit)}
                    onBlur={handleBlur}
                    noValidate
                >
                    <TextArea
                        placeholder="Enter something..."
                        onKeyDown={handleKeyDown}
                        {...register('newItemValue', {
                            validate: (value) => validateNotEmptyField(value),
                        })}
                        ref={(element) => {
                            ref(element);
                            textAreaRef.current = element;
                        }}
                    />
                    {errors.newItemValue && (
                        <span className={styles.error}>
                            {errors.newItemValue.message}
                        </span>
                    )}
                    <Button type="submit">Add</Button>
                </form>
            ) : (
                <Button onClick={() => setIsAddingItem(true)}>Add item</Button>
            )}
        </>
    );
};
