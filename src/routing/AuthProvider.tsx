import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { User } from '@/types/User'
import { AuthContext } from './auth-context'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const raw = localStorage.getItem('user')

        try {
            setUser(raw ? (JSON.parse(raw) as User) : null)
        } catch {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }, [])

    const login = (user: User) => {
        if (loading) return null

        localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }

    const logout = () => {
        localStorage.removeItem('user')
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}