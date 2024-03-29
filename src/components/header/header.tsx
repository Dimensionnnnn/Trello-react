import React from 'react';

import { Button } from 'components/UI/button/button';
import { logout } from 'redux/action';
import { useAppDispatch } from 'redux/hooks';

import styles from './header.module.scss';

interface Props {
    username: string;
}

export const Header: React.FC<Props> = ({ username }) => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        window.location.reload();
    };

    return (
        <header className={styles.container}>
            <h1 className={styles.content}>{username}</h1>
            <div className={styles.logout}>
                <Button onClick={handleLogout}>Log out</Button>
            </div>
        </header>
    );
};
