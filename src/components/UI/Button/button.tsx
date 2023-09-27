import React from 'react'
import styles from './button.module.scss'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    className?: string;
}

export const Button: React.FC<Props> = ({text, ...props}) => {
    const combinedClassNames = `${styles.button} ${props.className || ''}`
    return (
        <button className={combinedClassNames} {...props}>{text}</button>
    )
}