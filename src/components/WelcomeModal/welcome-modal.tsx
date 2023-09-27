import styles from './welcome-modal.module.scss';
import Input from '../UI/Input/input';
import Button from '../UI/Button/button';

interface Props {
    inputProps: {
        value: string;
        onChange: (value: string) => void;
    };
    buttonProps: {
        onClick: (event: React.FormEvent) => void;
    }
}

const WelcomeModal: React.FC<Props> = ({ inputProps, buttonProps}) => {
    return (
        <div className={styles.modal}>
            <form className={styles.content}>
                <Input label='Input your name' {...inputProps} />
                <Button onClick={buttonProps.onClick} type='submit' text='Submit'></Button>
            </form>
        </div>
    )
}

export default WelcomeModal;