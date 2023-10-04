import { StorageService } from "services/storage-service";

export const initializeStateFromLocalStorage = <T>(key: string, initialState: T): T => {
    const storedData = StorageService.getItem<T>(key);
    return storedData ? storedData : initialState;
}

export const getColumns = <T>(columnsData: T) => {
    return initializeStateFromLocalStorage('columns', columnsData);
}

export const getCards = <T>(cardsData: T) => {
    return initializeStateFromLocalStorage('cards', cardsData);
}

export const getComments = <T>(commentsData: T) => {
    return initializeStateFromLocalStorage('comments', commentsData);
}