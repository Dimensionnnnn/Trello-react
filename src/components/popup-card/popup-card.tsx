import { Popup } from "components/UI/popup/popup"
import { } from "hooks/useFocusAndSelect";
import { Card } from "types/types";
import { Button } from "components/UI/button/button";
import { EditableText } from "components/editable-text/editable-text";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    card?: Card;
    onCardTextChange: (id?: string , newTitle?: string) => void;
    onDescriptionChange: (id?: string, newDescription?: string) => void;
}

export const PopupCard: React.FC<Props> = ({isOpen, onClose, card, onCardTextChange, onDescriptionChange}) => {
    return (
        <Popup
            isOpen={isOpen}
            onClose={onClose}
        >
            <h2>Карточка</h2>

            <EditableText
                value={card?.title}
                onChange={(value) => onCardTextChange(card?.id, value)}
            />

            <p>Описание</p>
            <EditableText
                value={card?.description}
                onChange={(value) => onDescriptionChange(card?.id, value)}
            />

            <Button onClick={onClose}>
                Закрыть
            </Button>
        </Popup>
    )
}