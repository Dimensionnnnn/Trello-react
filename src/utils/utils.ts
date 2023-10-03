import { StorageService } from "services/storage-service";
import { Card, Column, Comment } from "types/types";

export const initializeStateFromLocalStorage = (key: string, initialState: Record<string, Column | Card | Comment>) => {
    const storedData = StorageService.getItem(key);
    return storedData ? storedData : initialState;
}