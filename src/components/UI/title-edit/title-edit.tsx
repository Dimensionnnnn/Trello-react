import React, { useState, useRef } from 'react';

import { TextArea } from 'components/UI/text-area/text-area';
import { useFocusAndSelect } from 'hooks/useFocusAndSelect';
import { useForm } from 'react-hook-form';
import { validateNotEmptyField } from 'redux/ducks/validation';

import styles from './title-edit.module.scss';

interface Props {
    title: string;
    onTitleChange: (newTitle: string) => void;
}

interface FormProps {
    title: string;
}

export const TitleEdit: React.FC<Props> = ({ title, onTitleChange }) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const { handleSubmit, register } = useForm<FormProps>();
    const { ref } = register('title');

    useFocusAndSelect({
        ref: textAreaRef,
        condition: isEditingTitle,
        value: title,
    });

    const onSubmit = (data: FormProps) => {
        onTitleChange(data.title);
        setIsEditingTitle(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit(onSubmit)();
            setIsEditingTitle(false);
        }
    };

    return (
        <>
            {isEditingTitle ? (
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextArea
                        {...register('title', {
                            validate: (value) => validateNotEmptyField(value),
                        })}
                        ref={(element) => {
                            ref(element);
                            textAreaRef.current = element;
                        }}
                        defaultValue={title}
                        onBlur={() => setIsEditingTitle(false)}
                        onKeyDown={handleKeyDown}
                    />
                </form>
            ) : (
                <h2
                    className={styles.title}
                    onClick={() => setIsEditingTitle(true)}
                >
                    {title}
                </h2>
            )}
        </>
    );
};
