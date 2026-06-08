import { api } from '@/api/client'
import type {
    PageableRequest,
    PageResponse
} from '@/api/client'

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

export interface GetUsersRequest extends PageableRequest {
    username?: string
    role?: Role
    active?: boolean
}

export const getMe = async (): Promise<UserInfoResponse> => {
    const res = await api.get<UserInfoResponse>("/users/me")
    return res.data
}

export const updateUser = async (id: string, request: UpdateUserRequest): Promise<UserInfoResponse> => {
    const res = await api.put<UserInfoResponse>(`/users/${id}`, request)
    return res.data
}

export const changeUserStatus = async (id: string, status: boolean): Promise<void> => {
    await api.patch(`/users/${id}`, {isActive: status})
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