import React, { useState, useRef } from "react";
import { Button } from "components/UI/button/button";
import { TextArea } from "components/UI/text-area/text-area";
import styles from "./card-add.module.scss";
import { useFocusAndSelect } from "hooks/useFocusAndSelect";

interface Props {
    columnId: string;
    onAddCard: (newCardTitle: string, columnId: string) => void;
}

export const CardAdd: React.FC<Props> = ({ columnId, onAddCard }) => {
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState('');
    const trimmedCardTitle = newCardTitle.trim();

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    useFocusAndSelect({ref: textAreaRef, condition: isAddingCard, value: newCardTitle});

    const handleAddCard = () => {
        if (trimmedCardTitle) {
            onAddCard(trimmedCardTitle, columnId);
            setNewCardTitle('');
            setIsAddingCard(false);
        }
    }

    const handleBlur = () => {
        setIsAddingCard(false);
    }

    const handleAddingCardClick = () => {
        setIsAddingCard(true);
        setNewCardTitle('');
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            setIsAddingCard(false);
        } else if (e.key === "Enter") {
            handleAddCard();
            setIsAddingCard(false);
        }
    }

    return (
        <>
            {isAddingCard ? (
                <>
                    <div className={styles.text}>
                            <TextArea
                                value={newCardTitle}
                                onChange={(e) => setNewCardTitle(e.target.value)}
                                onBlur={handleBlur}
                                onKeyDown={handleKeyDown}
                                ref={textAreaRef}
                                placeholder="Enter a new card title..."
                            />
                    </div>

                    <Button
                        onMouseDown={handleAddCard}
                        disabled={!trimmedCardTitle}
                    >
                        Add card
                    </Button>
                </>
            ) : (
                <Button
                    onClick={handleAddingCardClick}
                >
                    Add card
                </Button>
            )}
        </>
    )
}