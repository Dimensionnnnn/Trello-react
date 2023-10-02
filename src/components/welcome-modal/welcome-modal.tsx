import styles from './welcome-modal.module.scss';
import { Input } from 'components/UI/input/input';
import { Button } from 'components/UI/button/button';
import { useState } from 'react';

interface Props {
    onSubmit: (username: string) => void;
}

export const WelcomeModal: React.FC<Props> = ({onSubmit}) => {
    const [error, setError] = useState('');
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
    
        const name = formData.get('welcome-input') as string;
        const trimmedName = name.trim();
    
        if (!trimmedName) {
            setError('Please enter your name');
            return;
        }

        onSubmit(name);
    }

    return (
        <div className={styles.modal}>
            <form className={styles.content} onSubmit={handleSubmit}>
                <Input name='welcome-input' label='Input your name' error={error}/>
                <Button type='submit'>{'Submit'}</Button>
            </form>
        </div>
    )
}