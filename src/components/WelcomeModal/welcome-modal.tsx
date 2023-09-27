import styles from './welcome-modal.module.scss';
import { Input } from '../UI/Input/input';
import { Button } from '../UI/Button/button';
import { useState } from 'react';

interface Props {
    onSubmit: (username: string) => void;
}

export const WelcomeModal: React.FC<Props> = ({onSubmit}) => {
    const [error, setError] = useState<string | undefined>(undefined);
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
    
        const name = formData.get('welcome-input') as string;
    
        if (name.trim().length === 0) {
            setError('Please enter your name');
            return;
        }
    
        console.log(name);
        onSubmit(name);
    }

    return (
        <div className={styles.modal}>
            <form className={styles.content} onSubmit={handleSubmit}>
                <Input name='welcome-input' label='Input your name' errorMessage={error}/>
                <Button type='submit' text='Submit'/>
            </form>
        </div>
    )
}