import { Card, Column, Comment } from "types/types";


export class StorageService {
    static getItem(key: string) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static setItem(key: string, value: Record<string, Column| Card | Comment> | string) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    }
}