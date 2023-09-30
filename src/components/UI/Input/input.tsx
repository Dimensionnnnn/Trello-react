import React from 'react';
import styles from './input.module.scss';
import classNames from 'classnames';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    className?: string;
    error?: string;
}

export const Input: React.FC<Props> = ({label, error, ...props}) => {
    const combinedClassNames = classNames(styles.input, props.className, {
        [styles.error]: error
    });
    return (
        <div className={styles.container}>
            {label && <label className={styles.label}>{label}</label>}
            <input className={combinedClassNames} {...props}/>
            {error && <span className={styles.error}>{error}</span>}
        </div>
    )
}