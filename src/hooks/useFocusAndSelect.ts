import { useEffect, MutableRefObject } from 'react';

interface Props {
    ref: MutableRefObject<HTMLTextAreaElement | null>;
    condition: boolean;
    value: string;
}

export const useFocusAndSelect = ({ref, condition, value}: Props) => {
    useEffect(() => {
        if (condition && ref.current) {
            ref.current.focus();
            ref.current.setSelectionRange(
                value.length,
                value.length
            )
        }
    }, [condition, ref, value])
}