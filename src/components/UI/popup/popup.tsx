import React from "react";
import classNames from "classnames";
import styles from './popup.module.scss';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    popupBackgroundClass?: string;
    popupContentClass?: string;
}

export const Popup: React.FC<Props> = ({isOpen, onClose, children, ...props}) => {
    const backgroundClasses = classNames(styles.modal, props?.popupBackgroundClass, {
        [styles.active]: isOpen
    })

    const contentClasses = classNames(styles.content, props?.popupContentClass, {
        [styles.active]: isOpen
    })

    return (
        <div className={styles.container}>
            <div className={backgroundClasses} onClick={onClose}/>
            <div className={contentClasses}>
                {children}
            </div>
        </div>
    )
}