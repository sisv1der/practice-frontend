import { api } from '@/src/api/client'

export type Role = 'ADMIN' | 'OPERATOR' | 'EMPLOYEE'

export interface UserInfoResponse {
    id: string
    username: string
    firstName: string
    lastName: string
    role: Role
    isActive: boolean
    createdAt: string
}

export interface UpdateUserRequest {
    username: string
    firstName: string
    lastName: string
    password?: string
    role: Role
    isActive: boolean
}

export const getMe = async (): Promise<UserInfoResponse> => {
    const res = await api.get<UserInfoResponse>("/users/me")
    return res.data
}

export const deleteUser = async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`)
}

export const updateUser = async (id: string, request: UpdateUserRequest): Promise<UserInfoResponse> => {
    const res = await api.put<UserInfoResponse>(`/users/${id}`, request)
    return res.data
}