import { getCitizen } from '@/api/citizen'
import type { CitizenInfoResponse } from '@/api/citizen'
import type { Citizen } from '@/types/Citizen'
import { useCallback, useEffect, useState } from 'react'

export const useCitizen = (id: string): Citizen => {
    const [citizen, setCitizen] = useState<Citizen | undefined>(undefined)

    const loadCitizen = useCallback(async () => {
        const res: CitizenInfoResponse = await getCitizen(id)
        setCitizen({
            id: res.id,
            fullName: res.fullName,
            phoneNumber: res.phoneNumber,
            email: res.email
        })
    }, [id, setCitizen])

    useEffect(() => {
        loadCitizen().catch(r => console.log(r))
    }, [loadCitizen])

    return citizen
}