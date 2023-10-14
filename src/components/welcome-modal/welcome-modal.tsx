import styles from './welcome-modal.module.scss';
import { Input } from 'components/UI/input/input';
import { Button } from 'components/UI/button/button';
import { useForm } from 'react-hook-form';
import { validateNotEmptyField } from 'redux/ducks/validation';
import React from 'react';

interface Props {
    onSubmit: (username: string) => void;
}

export interface WelcomeModalFormProps {
    name: string
}

export const WelcomeModal: React.FC<Props> = ({onSubmit}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<WelcomeModalFormProps>();

    const handleOnSubmit = (data: WelcomeModalFormProps) => {
        onSubmit(data.name);
    }

    return (
        <div className={styles.modal}>
            <form className={styles.content} onSubmit={handleSubmit(handleOnSubmit)} noValidate>
                <Input
                    label='Enter your name'
                    {...register('name', {
                        validate: (value) => validateNotEmptyField(value),
                    })}
                    error={errors.name?.message}
                />
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}