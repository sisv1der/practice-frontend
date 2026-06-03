import type { UserInfoResponse } from '@/api/user'

export const UserRoles = {
    ADMIN: 'ADMIN',
    OPERATOR: 'OPERATOR',
    EMPLOYEE: 'EMPLOYEE',
} as const

export type UserRole = typeof UserRoles[keyof typeof UserRoles]

export interface User {
    id: string
    username: string
    firstName: string
    lastName: string
    role: UserRole
    isActive: boolean
    createdAt: Date
}

export const fromUserInfo = (dto: UserInfoResponse): User => {
    return {
        id: dto.id,
        username: dto.username,
        firstName: dto.firstName,
        lastName: dto.lastName,
        role: dto.role,
        isActive: dto.isActive,
        createdAt: new Date(dto.createdAt),
    }
}