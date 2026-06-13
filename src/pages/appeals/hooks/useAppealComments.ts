import { getAppealComments } from '@/api/appeal-comment'
import { fromAppealCommentInfo } from '@/types/AppealComment'
import type { AppealComment } from '@/types/AppealComment'
import { useCallback, useEffect, useState } from 'react'

export const useAppealComments = (appealId: string) => {
    const [ appealComments, setAppealComments ] = useState<AppealComment[]>([])

    const loadComments = useCallback(async () => {
        if (!appealId) return
        const res = await getAppealComments(appealId)
        setAppealComments(res.map(fromAppealCommentInfo))
    }, [ appealId ])

    useEffect(() => {
        loadComments().catch(r => console.log(r))
    }, [ loadComments, appealId ])

    return appealComments
}