import styles from './modal.module.scss';
import Input from '../UI/Input/input';
import Button from '../UI/Button/button';

interface Props {
    inputProps: {
        label?: string;
        value: string;
        onChange: (value: string) => void;
    };
    buttonProps: {
        children: React.ReactNode;
        onClick: () => void;
    }
}

const Modal: React.FC<Props> = ({ inputProps, buttonProps}) => {
    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                <Input {...inputProps} />
                <Button {...buttonProps}>{buttonProps.children}</Button>
            </div>
        </div>
    )
}

export default Modal;