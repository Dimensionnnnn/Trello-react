import styles from './welcome-modal.module.scss';
import { Input } from 'components/UI/input/input';
import { Button } from 'components/UI/button/button';
import { useForm, Controller } from 'react-hook-form';

interface Props {
    onSubmit: (username: string) => void;
}

interface FormProps {
    welcomeInput: string
}

export const WelcomeModal: React.FC<Props> = ({onSubmit}) => {
    const { handleSubmit, control, formState: { errors } } = useForm<FormProps>();

    const handleOnSubmit = (data: FormProps) => {
        onSubmit(data.welcomeInput);
    }

    return (
        <div className={styles.modal}>
            <form className={styles.content} onSubmit={handleSubmit(handleOnSubmit)} noValidate>
                <Controller
                    name='welcomeInput'
                    control={control}
                    defaultValue=''
                    rules={{
                        validate: (value) => !!value.trim() ? true : 'Please enter your name',
                    }}
                    render={({ field }) => (
                        <Input
                            label='Enter your name'
                            name={field.name}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            error={errors.welcomeInput?.message}
                        />
                    )}
                />
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}