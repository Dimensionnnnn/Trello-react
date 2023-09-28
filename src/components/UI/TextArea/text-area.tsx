import React from 'react'
import styles from './text-area.module.scss'
import classNames from 'classnames';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
}

export const TextArea: React.FC<Props> = ({...props}) => {
    const combinedClassNames = classNames(styles.textArea, props.className || '')
    return (
        <div className={styles.container}>
            <textarea className={combinedClassNames} {...props}/>
        </div>
    )
}
