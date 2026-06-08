import { useAuth } from '@/routing/auth-context'
import { Navigate } from 'react-router'

const RoleRedirect = () => {
    console.log('ROLE REDIRECT RENDER')
    const { user } = useAuth()

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return <Navigate to={`/${user.role.toLowerCase()}`} replace />
}

export default RoleRedirect