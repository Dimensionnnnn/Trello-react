import { Card } from "types/types";
import { AddCardAction, DeleteCardAction, UpdateCardDescriptionAction, UpdateCardTitleAction } from "./card-action-types";

export const addCard = (cardData: Card): AddCardAction => ({
    type: 'ADD_CARD',
    payload: cardData
})

export const updateCardTitle = (id: string, title: string): UpdateCardTitleAction => ({
    type: 'UPDATE_CARD_TITLE',
    payload: {
        id,
        title
    }
})

export const updateCardDescription = (id: string, description: string): UpdateCardDescriptionAction => ({
    type: 'UPDATE_CARD_DESCRIPTION',
    payload: {
        id,
        description
    }
})

export const deleteCard = (id: string): DeleteCardAction => ({
    type: 'DELETE_CARD',
    payload: id
})