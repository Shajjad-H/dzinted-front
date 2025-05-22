import { secureStorageService } from './secureStorageService';

const STORAGE_KEY_ACCESS = "dzinted-jwtAccessToken";
const STORAGE_KEY_REFRESH = "dzinted-jwtRefreshToken";

export const getAccessToken = async () => await secureStorageService.getItem<string>(STORAGE_KEY_ACCESS);

export const getRefreshToken = async () => await secureStorageService.getItem<string>(STORAGE_KEY_REFRESH);

export const setTokens = async (access: string, refresh: string) => {
    await Promise.all([
        secureStorageService.setItem(STORAGE_KEY_ACCESS, access),
        secureStorageService.setItem(STORAGE_KEY_REFRESH, refresh)
    ]);
}

export const clearTokens = async () => {
    await Promise.all([
        secureStorageService.removeItem(STORAGE_KEY_ACCESS),
        secureStorageService.removeItem(STORAGE_KEY_REFRESH)
    ]);
};