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