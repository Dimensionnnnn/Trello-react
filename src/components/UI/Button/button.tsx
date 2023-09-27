import React from 'react'
import styles from './button.module.scss'

type ButtonType = "button" | "submit" | "reset";

interface Props {
    text: string;
    type: ButtonType;
    onClick?: (event: React.FormEvent) => void;
}

const Button: React.FC<Props> = ({text, type, onClick}) => {
    return (
        <button className={styles.button} onClick={onClick} type={type}>{text}</button>
    )
}

export default Button;