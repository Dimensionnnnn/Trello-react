import { Column } from "types/types";
import { UpdateColumnTitle } from "./column-action-types";

const initialState: Record<string, Column> = {};

export const columnReducer = (
    state = initialState,
    action: UpdateColumnTitle
) => {
    switch (action.type) {
        case 'UPDATE_COLUMN_TITLE':
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    title: action.payload.title
                }
            }
        default:
            return state
    }
}