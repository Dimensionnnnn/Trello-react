import React, {forwardRef} from 'react'
import styles from './input.module.scss';
import classNames from 'classnames';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(({className, label, error, ...props}, ref) => {
    const combinedClassNames = classNames(styles.input, className, {
        [styles.error]: error
    });

    return (
        <div className={styles.container}>
            {label && <label className={styles.label}>{label}</label>}
            <input ref={ref} className={combinedClassNames} {...props}/>
            {error && <span className={styles.error}>{error}</span>}
        </div>
    )
})