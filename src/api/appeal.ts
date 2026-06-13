import { api } from '@/api/client'
import type { PageableRequest, PageResponse } from '@/api/client'
import type { AppealCategory, AppealStatus } from '@/types/Appeal'

export interface AppealInfoResponse {
    id: string
    title: string
    description?: string
    status: AppealStatus
    category: AppealCategory
    citizenId: string
    createdById: string
    assignedToId?: string
    createdAt: string
    updatedAt: string
}

export interface GetAppealsRequest extends PageableRequest {
    search?: string
    status?: AppealStatus
    category?: AppealCategory
}

export interface CreateAppealRequest {
    title: string
    description?: string
    category: AppealCategory
    citizenId: string
}

export interface UpdateAppealRequest {
    title: string
    description?: string
    status: AppealStatus
    category: AppealCategory
    citizenId: string
}

export const getAppeals = async (request: GetAppealsRequest): Promise<PageResponse<AppealInfoResponse>> => {
    const res = await api.get<PageResponse<AppealInfoResponse>>('/appeals', request)
    return res.data
}

export const getAppeal = async (id: string): Promise<AppealInfoResponse> => {
    const res = await api.get<AppealInfoResponse>(`/appeals/${id}`)
    return res.data
}

export const createAppeal = async (request: CreateAppealRequest) => {
    const res = await api.post<AppealInfoResponse>(
        `/appeals`,
        {
            params: {
                title: request.title,
                description: request.description,
                category: request.category,
                citizenId: request.citizenId
            }
        }
    )
    return res.data
}

export const updateAppeal = async (id: string, request: UpdateAppealRequest) => {
    const res = await api.put<AppealInfoResponse>(
        `/appeals/${id}`,
        {
            params: {
                title: request.title,
                description: request.description,
                status: request.status,
                category: request.category,
                citizenId: request.citizenId
            }
        }
    )
    return res.data
}