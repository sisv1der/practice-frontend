import { api } from '@/api/client'

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

export interface CreateUserRequest {
    username: string
    firstName: string
    lastName: string
    password: string
    role: Role
}

export interface GetUsersRequest {
    username?: string
    role?: Role
    active?: boolean
    page?: number
    size?: number
}

export interface PageResponse<T> {
    content: T[]
    totalPages: number
    totalElements: number
    size: number
    number: number
}

export const getMe = async (): Promise<UserInfoResponse> => {
    const res = await api.get<UserInfoResponse>("/users/me")
    return res.data
}

export const deactivateUser = async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`)
}

export const updateUser = async (id: string, request: UpdateUserRequest): Promise<UserInfoResponse> => {
    const res = await api.put<UserInfoResponse>(`/users/${id}`, request)
    return res.data
}

export const activateUser = async (id: string): Promise<UserInfoResponse> => {
    const res = await api.patch<UserInfoResponse>(`/users/${id}`)
    return res.data
}

export const createUser = async (request: CreateUserRequest) => {
    const res = await api.post<UserInfoResponse>('/users', request)
    return res.data
}

export const getUsers = async (
    request: GetUsersRequest
): Promise<PageResponse<UserInfoResponse>> => {

    const res = await api.get<PageResponse<UserInfoResponse>>(
        "/users",
        {
            params: {
                username: request.username,
                role: request.role,
                active: request.active,
                page: request.page,
                size: request.size
            }
        }
    )

    return res.data
}