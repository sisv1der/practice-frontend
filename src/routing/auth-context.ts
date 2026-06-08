import { createContext, useContext } from 'react'
import type { User } from '@/types/User'

type AuthContextType = {
    user: User | null
    loading: boolean
    login: (user: User) => void
    logout: () => void
    setUser: (user: User | null) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}