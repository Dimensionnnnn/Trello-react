import React from "react";
import classNames from "classnames";
import styles from './popup.module.scss';

interface Props {
    isActive: boolean;
    setActive: (active: boolean) => void;
    children?: React.ReactNode;
}

export const Popup: React.FC<Props> = ({isActive, setActive, children}) => {
    const modalClasses = classNames(styles.modal, {
        [styles.active]: isActive
    })

    const contentClasses = classNames(styles.content, {
        [styles.active]: isActive
    })
    
    return (
        <div className={modalClasses} onClick={() => setActive(false)}>
            <div className={contentClasses} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}