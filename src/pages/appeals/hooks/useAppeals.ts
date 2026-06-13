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
            search: search,
            status: status,
            category: category,
            page: page,
            size: size
        })
        setAppeals(res.content.map(fromAppealInfo))
        setTotalPages(res.totalPages)
    }, [ category, page, search, size, status ])

    useEffect(() => {
        loadAppeals().catch(r => console.log(r))
    }, [ loadAppeals ])

    return {
        appeals,
        totalPages
    }
}