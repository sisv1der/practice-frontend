import type { AppealInfoResponse } from '@/api/appeal'

export const AppealStatuses = {
    NEW: 'NEW',
    IN_PROGRESS: 'IN_PROGRESS',
    DONE: 'DONE',
    REJECTED: 'REJECTED'
} as const

export type AppealStatus = typeof AppealStatuses[keyof typeof AppealStatuses]

export const AppealCategories = {
    ROADS: 'ROADS',
    COMMUNAL_SERVICES: 'COMMUNAL_SERVICES',
    LIGHTING: 'LIGHTING',
    TRASH: 'TRASH',
    IMPROVEMENT: 'IMPROVEMENT',
    OTHER: 'OTHER'
}

export type AppealCategory = typeof AppealCategories[keyof typeof AppealCategories]

export interface Appeal {
    id: string
    title: string
    description?: string
    status: AppealStatus
    category: AppealCategory
    citizenId: string
    createdById: string
    assignedToId?: string
    createdAt: Date
    updatedAt: Date
}

export const fromAppealInfo = (dto: AppealInfoResponse) => {
    return {
        id: dto.id,
        title: dto.title,
        description: dto.description,
        status: dto.status,
        category: dto.category,
        citizenId: dto.citizenId,
        createdById: dto.createdById,
        assignedToId: dto.assignedToId,
        createdAt: new Date(dto.createdAt),
        updatedAt: new Date(dto.updatedAt)
    }
}