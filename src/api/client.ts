import axios from 'axios'

const API_URL: string = import.meta.env.VITE_API_URL

export interface PageResponse<T> {
    content: T[]
    totalPages: number
    totalElements: number
    size: number
    number: number
}

export interface PageableRequest {
    page?: number
    size?: number
}

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if (token && token !== 'undefined') {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

api.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                localStorage.removeItem("token")
                window.location.href = "/login"
            }
        }

        return Promise.reject(
            error instanceof Error ? error : new Error("Unknown error")
        )
    }
)