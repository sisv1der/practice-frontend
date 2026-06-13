import { getAppeal } from '@/api/appeal'
import type { AppealInfoResponse } from '@/api/appeal'
import { fromAppealInfo } from '@/types/Appeal'
import type { Appeal, AppealCategory, AppealStatus } from '@/types/Appeal'
import { useCallback, useEffect, useState } from 'react'

export const useAppeal = (id: string) => {
    const [ appeal, setAppeal ] = useState<Appeal>({
        id: '',
        title: '',
        description: '',
        status: 'NEW',
        category: 'ROADS',
        citizenId: '',
        createdById: '',
        assignedToId: '',
        createdAt: new Date(),
        updatedAt: new Date()
    })

    const loadAppeal = useCallback(async () => {
        const res: AppealInfoResponse = await getAppeal(id)
        setAppeal(fromAppealInfo(res))
    }, [ id ])

    useEffect(() => {
        loadAppeal().catch(r => console.log(r))
    }, [ loadAppeal, id ])

    return appeal
}