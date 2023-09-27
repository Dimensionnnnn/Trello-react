import React from 'react';
import styles from './input.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    className?: string;
    errorMessage?: string;
}

export const Input: React.FC<Props> = ({label, errorMessage, ...props}) => {
    const combinedClassNames = `${styles.input} ${props.className || ''} ${errorMessage ? styles.errorMessage : ''}`
    return (
        <div className={styles.container}>
            {label && <label className={styles.label}>{label}</label>}
            <input className={combinedClassNames} {...props}/>
            {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
        </div>
    )
}