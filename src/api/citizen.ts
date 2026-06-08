import { api } from '@/api/client'
import type {
    PageableRequest,
    PageResponse
} from '@/api/client'

export interface CreateUserRequest {
    fullName: string
    phoneNumber: string
    email: string
}

export interface GetCitizensRequest extends PageableRequest {
    search?: string
}

export interface CitizenInfoResponse {
    fullName: string
    phoneNumber: string
    email: string
}

export const createCitizen = async (request: CreateUserRequest) => {
    const res = await api.post<CitizenInfoResponse>('/citizens', request)
    return res.data
}

export const getCitizens = async (
    request: GetCitizensRequest
): Promise<PageResponse<CitizenInfoResponse>> => {

    const res = await api.get<PageResponse<CitizenInfoResponse>>(
        "/citizens",
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