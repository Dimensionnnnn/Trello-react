import React from "react";
import classNames from "classnames";
import styles from './popup.module.scss';

interface Props {
    isActive: boolean;
    setActive: (active: boolean) => void;
    children?: React.ReactNode;
    popupBackgroundClass?: string;
    popupContentClass?: string;
}

export const Popup: React.FC<Props> = ({isActive, setActive, children, ...props}) => {
    const backgroundClasses = classNames(styles.modal, props?.popupBackgroundClass, {
        [styles.active]: isActive
    })

    const contentClasses = classNames(styles.content, props?.popupContentClass, {
        [styles.active]: isActive
    })

    return (
        <div className={styles.container}>
            <div className={backgroundClasses} onClick={() => setActive(false)}/>
            <div className={contentClasses}>
                {children}
            </div>
        </div>
    )
}