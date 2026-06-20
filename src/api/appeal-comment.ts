import { api } from '@/api/client'

export interface AppealCommentInfoResponse {
    id: string
    appealId: string
    authorId: string
    text: string
    createdAt: string
}

export const getAppealComments = async (appealId: string): Promise<AppealCommentInfoResponse[]> => {
    const res = await api.get<AppealCommentInfoResponse[]>(`/appeals/${appealId}/comments`)
    return res.data
}

export const createAppealComment = async (appealId: string, text: string): Promise<AppealCommentInfoResponse> => {
    const res = await api.post<AppealCommentInfoResponse>(
        `/appeals/${appealId}/comments`, {text: text}
    )
    return res.data
}