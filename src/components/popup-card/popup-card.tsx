import { Popup } from "components/UI/popup/popup"
import { useFocusAndSelect } from "hooks/useFocusAndSelect";
import { useRef, useState } from "react";
import { Card } from "types/types";
import { Button } from "components/UI/button/button";
import { EditableText } from "components/editable-text/editable-text";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    card: Card | undefined;
    onCardTextChange: (id: string | undefined, newTitle: string | undefined) => void;
    onDescriptionChange: (id: string | undefined, newDescription: string | undefined) => void;
}

export const PopupCard: React.FC<Props> = ({isOpen, onClose, card, onCardTextChange, onDescriptionChange}) => {
    const [activeCardTitleIdEditing, setActiveCardTitleIdEditing] = useState<string | undefined>();
    const [activeCardDescriptionIdEditing, setActiveCardDescriptionIdEditing] = useState<string | undefined>();

    const textAreaTitleRef = useRef<HTMLTextAreaElement>(null);
    const textAreaDescriptionRef = useRef<HTMLTextAreaElement>(null);

    useFocusAndSelect({
        ref: textAreaTitleRef,
        condition: activeCardTitleIdEditing === card?.id,
        value: card?.title,
    });

    useFocusAndSelect({
        ref: textAreaDescriptionRef,
        condition: activeCardDescriptionIdEditing === card?.id,
        value: card?.description,
    })

    return (
        <Popup
            isOpen={isOpen}
            onClose={onClose}
        >
            <EditableText
                value={card?.title}
                isEditing={activeCardTitleIdEditing === card?.id}
                onChange={(value) => onCardTextChange(card?.id, value)}
                onClose={() => setActiveCardTitleIdEditing(undefined)}
                onClick={() => setActiveCardTitleIdEditing(card?.id)}
            />
            <p>Описание</p>
            <EditableText
                value={card?.description}
                isEditing={activeCardDescriptionIdEditing === card?.id}
                onChange={(value) => onDescriptionChange(card?.id, value)}
                onClose={() => setActiveCardDescriptionIdEditing(undefined)}
                onClick={() => setActiveCardDescriptionIdEditing(card?.id)}
            />
            <Button
                text="Закрыть"
                onClick={onClose}
            />
        </Popup>
    )
}