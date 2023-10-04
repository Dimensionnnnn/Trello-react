import React from 'react'
import styles from './button.module.scss'
import classNames from 'classnames'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
}

export const Button: React.FC<Props> = ({ children, ...props}) => {
    const combinedClassNames = classNames(styles.button, props.className || '')
    return (
        <button className={combinedClassNames} {...props}>{children}</button>
    )
}