import { Popup } from "components/UI/popup/popup"
import { useFocusAndSelect } from "hooks/useFocusAndSelect";
import { useRef, useState } from "react";
import { Card } from "types/types";
import { TextArea } from "components/UI/text-area/text-area";
import { Button } from "components/UI/button/button";

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

    const handleTitleBlur = () => {
        setActiveCardTitleIdEditing(undefined);
    }

    const handleDescriptionBlur = () => {
        setActiveCardDescriptionIdEditing(undefined);
    }

    const handleTitleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === "Escape") {
            setActiveCardTitleIdEditing(undefined);
        }
    };

    const handleDescriptionKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === "Escape") {
            setActiveCardDescriptionIdEditing(undefined);
        }
    }

    return (
        <Popup
            isOpen={isOpen}
            onClose={onClose}
        >
            {activeCardTitleIdEditing ? (
                <TextArea
                    key={card?.id}
                    ref={textAreaTitleRef}
                    value={card?.title}
                    onChange={() => onCardTextChange(card?.id, textAreaTitleRef.current?.value)}
                    onBlur={handleTitleBlur}
                    onKeyDown={handleTitleKeyDown}
                />
            ) : (
                <div onClick={() => setActiveCardTitleIdEditing(card?.id)}>{card?.title}</div>
            )}
            <p>Описание</p>
            {activeCardDescriptionIdEditing ? (
                <TextArea
                    ref={textAreaDescriptionRef}
                    value={card?.description}
                    onChange={() => onDescriptionChange(card?.id, textAreaDescriptionRef.current?.value)}
                    onBlur={handleDescriptionBlur}
                    onKeyDown={handleDescriptionKeyDown}
                />
            ) : (
                <div onClick={() => setActiveCardDescriptionIdEditing(card?.id)}>
                    {card?.description ? card?.description : "Добавьте описание"}
                </div>
            )}
            <Button
                text="Закрыть"
                onClick={onClose}
            />
        </Popup>
    )
}