import styles from './welcome-modal.module.scss';
import { Input } from 'components/UI/input/input';
import { Button } from 'components/UI/button/button';
import { useForm } from 'react-hook-form';
import { validateNotEmptyField } from 'redux/ducks/validation';

interface Props {
    onSubmit: (username: string) => void;
}

export interface WelcomeModalFormProps {
    'Your name': string
}

export const WelcomeModal: React.FC<Props> = ({onSubmit}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<WelcomeModalFormProps>();

    const handleOnSubmit = (data: WelcomeModalFormProps) => {
        onSubmit(data['Your name']);
    }

    return (
        <div className={styles.modal}>
            <form className={styles.content} onSubmit={handleSubmit(handleOnSubmit)} noValidate>
                <Input
                    label='Your name'
                    register={register}
                    validate={validateNotEmptyField}
                    error={errors['Your name']?.message}
                />
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}