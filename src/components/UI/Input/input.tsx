import React from 'react';
import styles from './input.module.scss';

interface Props {
    label?: string;
    value: string;
    onChange: (value: string) => void;
}

const Input: React.FC<Props> = ({label, value, onChange}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    }
    return (
        <div className={styles.container}>
            {label && <label className={styles.label}>{label}</label>}
            <input className={styles.input} type='text' value={value} onChange={handleChange}/>
        </div>
    )
}

export default Input;
