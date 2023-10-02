export interface Column {
    id: string;
    title: string;
}

export interface Card {
    id: string;
    columnId: string;
    title: string;
    description: string;
}