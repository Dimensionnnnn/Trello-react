import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Card } from "types/types";

const selectCards = (state: RootState) => state.cards;

const selectFilteredCards = (state: RootState, columnId: string) => {
    const cards = Object.values(selectCards(state));
    return cards.filter((card: Card) => card.columnId === columnId)
}

const selectCardById = (state: RootState, cardId: string) => {
    const cards = Object.values(selectCards(state));
    return cards.find((card: Card) => card.id === cardId)
}

export const selectCardsByColumnId = createSelector(
    selectFilteredCards,
    (filteredCards: Card[]) => filteredCards
)

export const getCardById = createSelector(
    selectCardById,
    (card?: Card) => card
)
