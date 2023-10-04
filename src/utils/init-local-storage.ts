import { StorageService } from "services/storage-service";

export const initializeStateFromLocalStorage = <T>(key: string, initialState: T): T => {
    const storedData = StorageService.getItem<T>(key);
    return storedData ? storedData : initialState;
}