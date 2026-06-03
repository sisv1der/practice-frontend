import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import type { User } from '@/types/User'

const AuthGuard = ({ children }: ReactNode): ReactNode => {
    const navigate = useNavigate()

    useEffect(() => {
        const raw = localStorage.getItem('user')
        const user: User | null = raw ? (JSON.parse(raw) as User) : null

        if (!user) {
            void navigate('/login')
        }
    }, [navigate])

    return children
}

export default AuthGuard