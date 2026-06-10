import { useAuth } from '@/routing/auth-context'
import { Navigate } from 'react-router'

const RoleRedirect = () => {
    const {user} = useAuth()

    if (!user) {
        return <Navigate to="/login" replace/>
    }

    return <Navigate to={`/${user.role.toLowerCase()}`} replace/>
}

export default RoleRedirect