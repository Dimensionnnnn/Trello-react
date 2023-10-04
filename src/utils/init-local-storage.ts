import { StorageService } from "services/storage-service";
import { columns, cards, comments } from "data/data";

export const initializeStateFromLocalStorage = <T>(key: string, initialState: T): T => {
    const storedData = StorageService.getItem<T>(key);
    return storedData ? storedData : initialState;
}

export const getColumns = () => {
    return initializeStateFromLocalStorage('columns', columns);
}

export const getCards = () => {
    return initializeStateFromLocalStorage('cards', cards);
}

export const getComments = () => {
    return initializeStateFromLocalStorage('comments', comments);
}