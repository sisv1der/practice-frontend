import { getCitizen } from '@/api/citizen'
import type { Citizen } from '@/types/Citizen'
import { useCallback, useEffect, useState } from 'react'

export const useCitizen = (id?: string): Citizen | undefined => {
    const [ citizen, setCitizen ] = useState<Citizen | undefined>(undefined)

    const loadCitizen = useCallback(async () => {
        if (!id) return

        const res: Citizen = await getCitizen(id)
        setCitizen(res)
    }, [ id, setCitizen ])

    useEffect(() => {
        loadCitizen().catch(r => console.log(r))
    }, [ loadCitizen ])

    return citizen
}