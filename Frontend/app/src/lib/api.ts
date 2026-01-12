import { Category, MenuItem, MenuParams, Restaurant } from "@/types";

const API_BASE_URL = "http://localhost:3001";

async function fetchJson<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (!res.ok) {
        throw new Error(`API Error: ${res.statusText}`);
    }
    return res.json();
}

export const api = {
    getRestaurant: () => fetchJson<Restaurant>("/restaurant"),

    getCategories: () => fetchJson<Category[]>("/categories"),

    getMenuItems: (params?: MenuParams) => {
        const searchParams = new URLSearchParams();
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined) {
                    searchParams.append(key, value.toString());
                }
            });
        }
        const queryString = searchParams.toString();
        return fetchJson<MenuItem[]>(`/menuItems${queryString ? `?${queryString}` : ""}`);
    },

    getMenuItem: (id: string) => fetchJson<MenuItem>(`/menuItems/${id}`),
};
