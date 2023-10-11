import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Card } from "types/types";

const selectCards = (state: RootState) => state.cards;

const selectCardsByColumnId = (state: RootState, columnId: string) => {
    const cards = Object.values(selectCards(state));
    return cards.filter((card: Card) => card.columnId === columnId)
}

const selectCardById = (state: RootState, cardId: string) => {
    return state.cards[cardId]
}

export const getCardsByColumnId = createSelector(
    selectCardsByColumnId,
    (filteredCards: Card[]) => filteredCards
)

export const getCardById = createSelector(
    selectCardById,
    (card?: Card) => card
)