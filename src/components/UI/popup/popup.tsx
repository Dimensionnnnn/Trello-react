import React, { useEffect } from 'react';

import classNames from 'classnames';

import styles from './popup.module.scss';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    className?: string;
}

export const Popup: React.FC<Props> = ({
    isOpen,
    onClose,
    children,
    className,
}) => {
    const containerClasses = classNames(styles.container, {
        [styles.active]: isOpen,
    });

    const contentClasses = classNames(styles.content, className, {
        [styles.active]: isOpen,
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isOpen && e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    return (
        <div className={containerClasses}>
            <div className={styles.modal} onClick={onClose} />
            <div className={contentClasses}>{children}</div>
        </div>
    );
};
