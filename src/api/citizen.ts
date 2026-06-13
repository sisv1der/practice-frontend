import type { AppealInfoResponse } from '@/api/appeal'
import { api } from '@/api/client'
import type {
    PageableRequest,
    PageResponse
} from '@/api/client'
import type { Citizen } from '@/types/Citizen'

export interface CreateCitizenRequest {
    fullName: string
    phoneNumber: string
    email: string
}

export interface GetCitizensRequest extends PageableRequest {
    search?: string
}

export interface UpdateCitizenRequest {
    fullName: string
    phoneNumber: string
    email: string
}

export const createCitizen = async (request: CreateCitizenRequest) => {
    const res = await api.post<Citizen>('/citizens', request)
    return res.data
}

export const getCitizens = async (
    request: GetCitizensRequest
): Promise<PageResponse<Citizen>> => {

    const res = await api.get<PageResponse<Citizen>>(
        '/citizens',
        {
            params: {
                search: request.search,
                page: request.page,
                size: request.size
            }
        }
    )

    return res.data
}

export const getCitizen = async (id: string): Promise<Citizen> => {
    const res = await api.get<Citizen>(`/citizens/${id}`)
    return res.data
}

export const updateCitizen = async (id: string, request: UpdateCitizenRequest): Promise<Citizen> => {
    const res = await api.put<Citizen>(`citizens/${id}`, request)
    return res.data
}

export const deleteCitizen = async (id: string): Promise<void> => {
    await api.delete(`citizens/${id}`)
}

export const getCitizenAppeals = async (id: string, request: PageableRequest): Promise<PageResponse<AppealInfoResponse>> => {
    const res = await api.get<PageResponse<AppealInfoResponse>>(
        `/citizens/${id}/appeals`,
        {
            params: {
                page: request.page,
                size: request.size
            }
        }
    )

    return res.data
}