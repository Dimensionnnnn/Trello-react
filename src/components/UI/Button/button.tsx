import React from 'react'
import styles from './button.module.scss'
import classNames from 'classnames'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    className?: string;
}

export const Button: React.FC<Props> = ({text, ...props}) => {
    const combinedClassNames = classNames(styles.button, props.className || '')
    return (
        <button className={combinedClassNames} {...props}>{text}</button>
    )
}