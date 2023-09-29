export interface Column {
    id: number;
    title: string;
}

export interface Card {
    id: string;
    columnId: number;
    title: string;
}