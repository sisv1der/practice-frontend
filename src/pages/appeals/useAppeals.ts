import type { AppealInfoResponse } from '@/api/appeal'
import type { PageableRequest, PageResponse } from '@/api/client'
import { fromAppealInfo } from '@/types/Appeal'
import { useCallback, useEffect, useState } from 'react'

export const useAppeals = (id: string, request: PageableRequest) => {
    const [ appeals, setAppeals ] = useState<Appeal[]>([])
    const [ totalPages, setTotalPages ] = useState<number>(0)

    const loadAppeals = useCallback(async () => {
        const res: PageResponse<AppealInfoResponse> = await getAppeals(request)
        setAppeals(res.content.map(fromAppealInfo))
        setTotalPages(res.totalPages)
    }, [ id, request ])

    useEffect(() => {
        loadAppeals().catch(r => console.log(r))
    }, [ loadAppeals ])

    return {
        appeals,
        totalPages
    }
}