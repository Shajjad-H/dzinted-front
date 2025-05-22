import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// --- Helper to check if SecureStore is available and we are not on web ---
const isSecureStoreAvailable = (): boolean => {
    return Platform.OS !== 'web' && !!SecureStore;
};

/**
 * Retrieves an item from storage (SecureStore for native, localStorage for web).
 * @param key The key of the item to retrieve.
 * @returns A promise that resolves to the stored item, or null if not found or an error occurs.
 */
const getItem = async <T>(key: string): Promise<T | null> => {
    try {
        let storedValue: string | null = null;
        if (isSecureStoreAvailable()) {
            storedValue = await SecureStore.getItemAsync(key);
        } else if (typeof localStorage !== 'undefined') {
            storedValue = localStorage.getItem(key);
        } else {
            console.warn('No storage mechanism available (SecureStore or localStorage).');
            return null;
        }

        if (storedValue) {
            try {
                return JSON.parse(storedValue) as T;
            } catch (error) {
                console.error(`Error parsing JSON for key "${key}" from storage:`, error);
                // Optionally, remove the corrupted item
                // if (isSecureStoreAvailable()) await SecureStore.deleteItemAsync(key);
                // else if (typeof localStorage !== 'undefined') localStorage.removeItem(key);
                return null;
            }
        }
        return null;
    } catch (error) {
        console.error(`Error getting item with key "${key}" from storage:`, error);
        return null;
    }
};

/**
 * Stores an item (securely on native, in localStorage on web).
 * @param key The key to store the item under.
 * @param value The value to store. It will be JSON.stringify-ed.
 * @returns A promise that resolves when the item has been stored (void for web).
 */
const setItem = async (key: string, value: any): Promise<void> => {
    try {
        const serializedValue = JSON.stringify(value);
        if (isSecureStoreAvailable()) {
            await SecureStore.setItemAsync(key, serializedValue);
        } else if (typeof localStorage !== 'undefined') {
            localStorage.setItem(key, serializedValue);
        } else {
            console.warn('No storage mechanism available (SecureStore or localStorage) to set item.');
        }
    } catch (error) {
        console.error(`Error setting item with key "${key}" in storage:`, error);
        // Rethrow or handle more gracefully depending on your app's needs
        throw error;
    }
};

/**
 * Removes an item from storage (SecureStore for native, localStorage for web).
 * @param key The key of the item to remove.
 * @returns A promise that resolves when the item has been removed (void for web).
 */
const removeItem = async (key: string): Promise<void> => {
    try {
        if (isSecureStoreAvailable()) {
            await SecureStore.deleteItemAsync(key);
        } else if (typeof localStorage !== 'undefined') {
            localStorage.removeItem(key);
        } else {
            console.warn('No storage mechanism available (SecureStore or localStorage) to remove item.');
        }
    } catch (error) {
        console.error(`Error removing item with key "${key}" from storage:`, error);
    }
};

export const secureStorageService = {
    getItem,
    setItem,
    removeItem,
};
