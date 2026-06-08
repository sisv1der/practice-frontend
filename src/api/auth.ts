import { api } from "@/api/client"

export interface LoginRequest {
    username: string
    password: string
}

export interface LoginResponse {
    token: string;
}

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
    const res = await api.post<LoginResponse>("/auth/login", data)
    return res.data
}