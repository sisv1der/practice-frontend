import { useAuth } from '@/routing/auth-context'
import { Navigate, Outlet } from 'react-router'

const AuthGuard = () => {
    const { user, loading } = useAuth()

    if (loading) {
        return <div>Загрузка...</div>
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default AuthGuard