import React from "react";
import styles from "./header.module.scss";

interface Props {
    username: string;
}

export const Header: React.FC<Props> = ({username}) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.content}>{username}</h1>
        </div>
    )
};