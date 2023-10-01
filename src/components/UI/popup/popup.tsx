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
    const backgroundClass = classNames(styles.modal, props?.popupBackgroundClass, {
        [styles.active]: isActive
    })

    const contentClass = classNames(styles.content, props?.popupContentClass, {
        [styles.active]: isActive
    })

    const handleBackgroundClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setActive(false);
        }
    }
    
    return (
        <div className={backgroundClass} onClick= {handleBackgroundClick}>
            <div className={contentClass}>
                {children}
            </div>
        </div>
    )
}