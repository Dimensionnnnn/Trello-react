import { UpdateColumnTitle } from "./column-action-types"

export const updateColumnTitle = (id: string, title: string): UpdateColumnTitle => ({
    type: 'UPDATE_COLUMN_TITLE',
    payload: {
        id,
        title
    }
})