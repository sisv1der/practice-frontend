import type { AppealInfoResponse } from '@/api/appeal'
import { getAppeals } from '@/api/appeal'
import type { PageResponse } from '@/api/client'
import { fromAppealInfo } from '@/types/Appeal'
import { useCallback, useEffect, useState } from 'react'

export const useAppeals = (
    search: string,
    status: AppealStatus,
    category: AppealCategory,
    page: number,
    size: number
) => {
    const [ appeals, setAppeals ] = useState<Appeal[]>([])
    const [ totalPages, setTotalPages ] = useState<number>(0)

    const loadAppeals = useCallback(async () => {
        const res: PageResponse<AppealInfoResponse> = await getAppeals({
            search,
            status,
            category,
            page,
            size
        })

        setAppeals(res.content.map(fromAppealInfo))
        setTotalPages(res.totalPages)
    }, [ search, status, category, page, size ])

    useEffect(() => {
        loadAppeals().catch(console.error)
    }, [ loadAppeals ])

    return {
        appeals,
        totalPages,
        refetch: loadAppeals
    }
}