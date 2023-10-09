import { Card } from "types/types";
import { AddCardAction, DeleteCardAction, UpdateCardDescriptionAction, UpdateCardTitleAction } from "./card-action-types";

const initialState: Record<string, Card> = {};

export const cardReducer = (
    state: Record<string, Card> = initialState,
    action: AddCardAction | UpdateCardTitleAction | UpdateCardDescriptionAction | DeleteCardAction
) => {
    switch (action.type) {
        case 'ADD_CARD':
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case 'UPDATE_CARD_TITLE':
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    title: action.payload.title
                }
            }
        case 'UPDATE_CARD_DESCRIPTION':
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    description: action.payload.description
                }
            }
        case 'DELETE_CARD':
            const newState = {...state};
            delete newState[action.payload];
            return newState;
        default:
            return state
    }
}