import React, { useRef } from 'react';

import { TextArea } from 'components/UI/text-area/text-area';
import { useFocusAndSelect } from 'hooks/useFocusAndSelect';
import { useForm } from 'react-hook-form';

import styles from './editable-text.module.scss';

interface Props {
    value?: string;
    onChange: (value?: string) => void;
}

interface FormProps {
    text: string;
}

export const EditableText: React.FC<Props> = ({ value, onChange }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    const { handleSubmit, register } = useForm<FormProps>();
    const { ref } = register('text');

    useFocusAndSelect({
        ref: textAreaRef,
        condition: isEditing,
        value: value,
    });

    const onSubmit = (data: FormProps) => {
        onChange(data.text);
        onClose();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        e.stopPropagation();
        if (e.key === 'Enter') {
            handleSubmit(onSubmit)();
        } else if (e.key === 'Escape') {
            onClose();
        }
    };

    const onClick = () => {
        setIsEditing(true);
    };

    const onClose = () => {
        setIsEditing(false);
    };

    return (
        <>
            {isEditing ? (
                <form
                    className={styles.wrapper}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    <TextArea
                        {...register('text')}
                        ref={(element) => {
                            ref(element);
                            textAreaRef.current = element;
                        }}
                        defaultValue={value}
                        onBlur={onClose}
                        onKeyDown={handleKeyDown}
                    />
                </form>
            ) : (
                <div onClick={onClick} className={styles.text}>
                    {value ? value : 'Нажмите для редактирования'}
                </div>
            )}
        </>
    );
};
