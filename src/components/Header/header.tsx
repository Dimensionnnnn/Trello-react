import React from "react";
import styles from "./header.module.scss";

interface Props {
    username: string;
}

export const Header: React.FC<Props> = ({username}) => {
    return (
        <>
            <div className={styles.headerContainer}>
                <h1 className={styles.headerContent}>{username}</h1>
            </div>
        </>
    )
};