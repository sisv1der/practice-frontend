import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import type { User } from '@/types/User'

const RoleRedirect = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const raw = localStorage.getItem('user')
        const user: User | null = raw ? (JSON.parse(raw) as User) : null

        if (!user) return

        void navigate('/' + user.role.toLowerCase())
    }, [navigate])

    return null
}

export default RoleRedirect