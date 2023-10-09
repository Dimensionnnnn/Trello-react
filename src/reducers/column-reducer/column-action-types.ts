export interface UpdateColumnTitle {
    type: 'UPDATE_COLUMN_TITLE';
    payload: {
        id: string;
        title: string;
    };
}