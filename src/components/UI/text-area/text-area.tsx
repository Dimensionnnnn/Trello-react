import React, {forwardRef} from 'react'
import styles from './text-area.module.scss'
import classNames from 'classnames';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
    const combinedClassNames = classNames(styles.textArea, props.className || '')
    return (
        <textarea ref={ref} className={combinedClassNames} {...props}/>
    )
})

TextArea.displayName = 'TextArea'