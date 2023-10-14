export const validateNotEmptyField = (value: string) => {
    return !!value.trim() ? true : errorMessage.required;
};

const errorMessage = {
    required: 'Please enter something',
};
