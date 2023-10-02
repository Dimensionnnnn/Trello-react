import { Column } from "components/column/column";
import React, { useEffect, useState } from "react";
import styles from "./board.module.scss";
import { columns as columnsData, cards as cardsData , comments as commentsData } from "data/data";
import { CardProps } from "components/column/column";
import { CommentProps } from "components/popup-card/popup-card";
import { Card as ICard } from "types/types";
import { Column as IColumn } from "types/types";
import { Comment as IComment } from "types/types";
import { PopupCard } from "components/popup-card/popup-card";
import { v4 as uuidv4 } from "uuid";

interface Props {
    username: string;
}

export const Board: React.FC<Props> = ({username}) => {
    const [columns, setColumns] = useState<Record<string, IColumn>>(columnsData);
    const [cards, setCards] = useState<Record<string, ICard>>(cardsData);
    const [comments, setComments] = useState<Record<string, IComment>>(commentsData);

    const [activeCardIdPopup, setActiveCardIdPopup] = useState<string | null>(null);

    useEffect(() => {
        const storedColumns = localStorage.getItem('columns');
        const storedCards = localStorage.getItem('cards');
        const storedComments = localStorage.getItem('comments');

        if (storedColumns) {
            setColumns(JSON.parse(storedColumns));
        } else {
            setColumns(columnsData);
        }

        if (storedCards) {
            setCards(JSON.parse(storedCards));
        } else {
            setCards(cardsData);
        }

        if (storedComments) {
            setComments(JSON.parse(storedComments));
        } else {
            setComments(commentsData);
        }
    }, [])

    const getInitialCardsToCurrentColumn = (columnId: string) => {
        return Object.values(cards).reduce((acc: CardProps, card: ICard) => {
            if (card.columnId === columnId) {
                acc[card.id] = card;
            }
            return acc;
        }, {});
    }

    const updateColumns = (newColumns: Record<string, IColumn>) => {
        setColumns(newColumns);
        localStorage.setItem('columns', JSON.stringify(newColumns));
    }

    const updateCards = (newCards: Record<string, ICard>) => {
        setCards(newCards);
        localStorage.setItem('cards', JSON.stringify(newCards));
    }

    const updateComments = (newComments: Record<string, IComment>) => {
        setComments(newComments);
        localStorage.setItem('comments', JSON.stringify(newComments));
    }

    const handleColumnTitleChange = (id: string, newTitle: string) => {
        const columnsCopy = {...columns};
        columnsCopy[id].title = newTitle;
        updateColumns(columnsCopy);
    };

    const handleAddCard = (newCardTitle: string, columnId: string) => {
        const newCard: ICard = {
            id: uuidv4(),
            columnId: columnId,
            title: newCardTitle,
            description: "",
        }

        const updatedCards = {...cards};
        updatedCards[newCard.id] = newCard;
        updateCards(updatedCards);
    }

    const handleDeleteCard = (cardId: string) => {
        const updatedCards = {...cards};
        delete updatedCards[cardId];
        updateCards(updatedCards);
    }

    const handleCardTextChange = (id?: string, newTitle?: string) => {
        if (id && newTitle) {
            const updatedCards = {...cards};
            updatedCards[id].title = newTitle;
            updateCards(updatedCards);
        }
    }

    const handleCardDescriptionChange = (id?: string, newDescription?: string) => {
        if (id && newDescription) {
            const updatedCards = {...cards};
            updatedCards[id].description = newDescription;
            updateCards(updatedCards);
        }
    }

    const getCardById = (cardId: string | null) => {
        if (cardId) {
            return cards[cardId];
        }
    }

    const getItialCommentsToCurrentCard = (cardId: string | null) => {
        return Object.values(comments).reduce((acc: CommentProps, comment: IComment) => {
            if (comment.cardId === cardId) {
                acc[comment.id] = comment;
            }
            return acc;
        }, {});
    }

    const handleAddComment = (newCardDescription?: string, cardId?: string) => {
        if (newCardDescription && cardId) {
            const newComment: IComment = {
                id: uuidv4(),
                cardId: cardId,
                description: newCardDescription,
                author: username,
            }
    
            const updatedComments = {...comments};
            updatedComments[newComment.id] = newComment;
            updateComments(updatedComments);
        }
    }

    const handleDeleteComment = (commentId?: string) => {
        if (commentId) {
            const updatedComments = {...comments};
            delete updatedComments[commentId];
            updateComments(updatedComments);
        }
    }

    const handleCommentDescriptionChange = (id?: string, newDescription?: string) => {
        if (id && newDescription) {
            const updatedComments = {...comments};
            updatedComments[id].description = newDescription;
            updateComments(updatedComments);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {Object.values(columns).map((column) => (
                    <Column
                        key={column.id}
                        id={column.id}
                        title={column.title}
                        cards={getInitialCardsToCurrentColumn(column.id)}
                        onTitleChange={(newTitle: string) => handleColumnTitleChange(column.id, newTitle)}
                        onAddCard={(newCardTitle: string, columnId: string) => handleAddCard(newCardTitle, columnId)}
                        onDeleteCard={handleDeleteCard}
                        onCardTextChange={handleCardTextChange}
                        onCardClick={setActiveCardIdPopup}
                    />
                ))}
            </div>
            <PopupCard
                isOpen={!!activeCardIdPopup}
                onClose={() => {setActiveCardIdPopup(null)}}
                card={getCardById(activeCardIdPopup)}
                comments={getItialCommentsToCurrentCard(activeCardIdPopup)}
                onAddComment={handleAddComment}
                onDeleteComment={handleDeleteComment}
                onCommentDescriptionChange={handleCommentDescriptionChange}
                onCardTextChange={handleCardTextChange}
                onDescriptionChange={handleCardDescriptionChange}
            />
        </div>
    );
};