import React from 'react';
import styles from './input.module.scss';
import classNames from 'classnames';
import { WelcomeModalFormProps } from 'components/welcome-modal/welcome-modal';
import { Path, UseFormRegister } from 'react-hook-form';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label: Path<WelcomeModalFormProps>;
    className?: string;
    register: UseFormRegister<WelcomeModalFormProps>;
    error?: string;
    validate: (value: string) => string | boolean;
}

export const Input: React.FC<Props> = ({ label, register, validate, error, ...props}) => {
    const combinedClassNames = classNames(styles.input, props.className, {
        [styles.error]: error
    });
    return (
        <div className={styles.container}>
            {label && <label className={styles.label}>{label}</label>}
            <input className={combinedClassNames} {...register(label, {validate: (value) => validate(value)})} {...props}/>
            {error && <span className={styles.error}>{error}</span>}
        </div>
    )
}