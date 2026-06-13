import type { AppealCommentInfoResponse } from '@/api/appeal-comment'

export interface AppealComment {
    id: string
    appealId: string
    authorId: string
    text: string
    createdAt: Date
}

export const fromAppealCommentInfo = (info: AppealCommentInfoResponse): AppealComment => {
    return {
        id: info.id,
        appealId: info.appealId,
        authorId: info.authorId,
        text: info.text,
        createdAt: new Date(info.createdAt)
    }
}