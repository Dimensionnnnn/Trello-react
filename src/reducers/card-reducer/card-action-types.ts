import { Card } from 'types/types';

export interface AddCardAction {
    type: 'ADD_CARD';
    payload: Card;
}

export interface UpdateCardTitleAction {
    type: 'UPDATE_CARD_TITLE';
    payload: {
        id: string;
        title: string;
    };
}

export interface UpdateCardDescriptionAction {
    type: 'UPDATE_CARD_DESCRIPTION';
    payload: {
        id: string;
        description: string;
    };
}

export interface DeleteCardAction {
    type: 'DELETE_CARD';
    payload: string;
}