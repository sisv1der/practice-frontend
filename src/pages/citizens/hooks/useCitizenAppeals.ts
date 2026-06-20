import type { AppealInfoResponse } from '@/api/appeal'
import { getCitizenAppeals } from '@/api/citizen'
import type { PageResponse } from '@/api/client'
import { fromAppealInfo } from '@/types/Appeal'
import type { Appeal } from '@/types/Appeal'
import { useCallback, useEffect, useState } from 'react'

export const useCitizenAppeals = (id: string, page: number, size: number) => {
    const [ appeals, setAppeals ] = useState<Appeal[]>([])
    const [ totalPages, setTotalPages ] = useState<number>(0)

    const loadAppeals = useCallback(async () => {
        const res: PageResponse<AppealInfoResponse> = await getCitizenAppeals(id, {
            page,
            size
        })
        setAppeals(res.content.map(fromAppealInfo))
        setTotalPages(res.totalPages)
    }, [ id, page, size ])

    useEffect(() => {
        loadAppeals().catch(r => console.log(r))
    }, [ loadAppeals ])

    return {
        appeals,
        totalPages
    }
}