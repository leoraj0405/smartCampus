export const setLocalStorage = (key: string, data: any) => {
    const encodedDetails = btoa(JSON.stringify(data));
    localStorage.setItem(key, JSON.stringify(encodedDetails));
}

export const getLocalStorage = (key: string) => {
    const encodedDetails = localStorage.getItem(key);
    if (!encodedDetails) return null;
    const normalData = JSON.parse(atob(encodedDetails));
    return normalData;
}

export const removeLocalStorage = (key: string) => {
    localStorage.removeItem(key)
}