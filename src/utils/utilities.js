import { getToken } from './StorageUtils';

export function isAuthenticated() {
    return getToken() ? true : false;
}