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

export interface ExportAppealsRequest {
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
    const res = await api.get<PageResponse<AppealInfoResponse>>('/appeals', {
        params: request
    })
    return res.data
}

export const getAppeal = async (id: string): Promise<AppealInfoResponse> => {
    const res = await api.get<AppealInfoResponse>(`/appeals/${id}`)
    return res.data
}

export const createAppeal = async (request: CreateAppealRequest) => {
    const res = await api.post<AppealInfoResponse>(`/appeals`, request)
    return res.data
}

export const updateAppeal = async (id: string, request: UpdateAppealRequest) => {
    const res = await api.put<AppealInfoResponse>(`/appeals/${id}`, request)
    return res.data
}

export const claimAppeal = async (id: string) => {
    const res = await api.patch<AppealInfoResponse>(`/appeals/${id}/status`)
    return res.data
}

export const exportAppeals = async (request: ExportAppealsRequest) => {
    const res = await api.get<Blob>('/appeals/export', {
        responseType: 'blob',
        params: request
    })

    const url = window.URL.createObjectURL(res.data)

    const link = document.createElement('a')

    link.href = url
    link.download = 'report.xlsx'

    document.body.appendChild(link)

    link.click()

    link.remove()

    setTimeout(() => {
        window.URL.revokeObjectURL(url)
    }, 1000)

    link.remove()
}