import { Card } from "components/card/card";
import { Card as ICard } from "types/types";
import { Button } from "components/UI/button/button";
import { Input } from "components/UI/input/input";
import { TextArea } from "components/UI/text-area/text-area";
import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect, useRef } from "react";
import styles from "./column.module.scss";
import { Card as ICard } from "types/types";
import React from "react";
import styles from "./column.module.scss";
import { CardList } from "./card-list";
import { CardAdd } from "./card-add";
import { TitleEdit } from "components/UI/title-edit/title-edit";

export interface CardProps { [id: string]: ICard };

interface Props {
    id: string;
    title: string;
    cards: CardProps;
    onTitleChange: (newTitle: string) => void;
}

export const Column: React.FC<Props> = ({title, onTitleChange, ...props}) => {
    const [cards, setCards] = useState<CardProps>(props.cards);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState('');

    const [openItemId, setOpenItemId] = useState<string | null>(null);
    const [isAddingCardOpen, setIsAddingCardOpen] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleAddCard = () => {
        const trimmedCardTitle = newCardTitle.trim();

        if (trimmedCardTitle) {
            const newCardId = uuidv4();
            const newCard: ICard = {
                id: newCardId,
                columnId: props.id,
                title: trimmedCardTitle,
            }

            setCards({...cards, [newCardId]: newCard})
            setNewCardTitle('');
        }
    }

    const handleCardTextChange = (id: string, newTitle: string) => {
        const updatedCards = {...cards};

        if (updatedCards[id]) {
            updatedCards[id] = {
                ...updatedCards[id],
                title: newTitle,
            };

            setCards(updatedCards)
        }
    }

    useEffect(() => {
        if (isAddingCardOpen && textAreaRef.current) {
            textAreaRef.current.focus();
            textAreaRef.current.setSelectionRange(
                newCardTitle.length,
                newCardTitle.length
            )
        }
    }, [isAddingCardOpen, newCardTitle]);

    const handleAddCardClick = () => {
        setOpenItemId(null)
        setIsAddingCardOpen(true);
        setNewCardTitle('');
    }

    const handleAddCardBlur = () => {
        setIsAddingCardOpen(false);
    }

    const handleAddCardMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        handleAddCard();
    }
    onAddCard: (newCard: ICard) => void;
    onCardTextChange: (id: string, newTitle: string) => void;
}

export const Column: React.FC<Props> = ({...props}) => {
    const { id, title, cards, onTitleChange, onAddCard, onCardTextChange } = props;

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    {isEditingTitle ? (
                        <Input
                            type='text'
                            value={title}
                            onChange={(e) => onTitleChange(e.target.value)}
                            onBlur={() => setIsEditingTitle(false)}
                        />
                    ): (
                        <h2 className={styles.title} onClick={() => setIsEditingTitle(true)}>{title}</h2>
                    )}
                </div>
                {Object.values(cards).map((card) => (
                    <Card
                        key={card.id}
                        card={{...card}}
                        isOpen={openItemId === card.id}
                        onTextChange={(newText: string) => handleCardTextChange(card.id, newText)}
                        onOpen={() => setOpenItemId(card.id)}
                        onClose={() => setOpenItemId(null)}
                    />
                ))}
                {isAddingCardOpen ? (
                        <>
                            <div className={styles.text}>
                                <TextArea
                                    value={newCardTitle}
                                    onChange={(e) => setNewCardTitle(e.target.value)}
                                    onBlur={handleAddCardBlur}
                                    ref={textAreaRef}
                                    placeholder="Enter a new card title..."
                                />
                            </div>
                            <Button
                                text='Add card'
                                onMouseDown={handleAddCardMouseDown}
                                disabled={!newCardTitle.trim()}
                            />
                        </>
                    ) : (
                    <Button
                        text="Add card"
                        onClick={handleAddCardClick}
                    />
                )}
                    <TitleEdit title={title} onTitleChange={onTitleChange}/>
                </div>
                <CardList cards={cards} onCardTextChange={onCardTextChange}/>
                <CardAdd onAddCard={onAddCard} columnId={id}/>
            </div>
        </div>
    )
};
