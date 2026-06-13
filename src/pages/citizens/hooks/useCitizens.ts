import { getCitizens } from '@/api/citizen'
import type { PageResponse } from '@/api/client'
import type { Citizen } from '@/types/Citizen'
import { useCallback, useEffect, useState } from 'react'

export interface CitizenFilters {
    search?: string
}

export const useCitizens = (page: number, filters?: CitizenFilters): {
    citizens: Citizen[]
    totalPages: number
} => {
    const [ citizens, setCitizens ] = useState<Citizen[]>([])
    const [ totalPages, setTotalPages ] = useState<number>(0)
    const loadCitizens = useCallback(async () => {
        const PAGE_SIZE = 10
        const search = filters?.search?.trim() || undefined
        const data: PageResponse<Citizen> = await getCitizens({
            search: search,
            page,
            size: PAGE_SIZE
        })

        setCitizens(data.content)
        setTotalPages(data.totalPages)
    }, [ filters?.search, page ])

    useEffect(() => {
        loadCitizens().catch(r => console.log(r))
    }, [ loadCitizens ])

    return {
        citizens,
        totalPages
    }
}