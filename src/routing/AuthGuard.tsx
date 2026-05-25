import { useNavigate } from 'react-router'
import { useEffect } from 'react'

const AuthGuard = ({ children }) => {
    const navigate = useNavigate()

    useEffect(() => {
        const raw = localStorage.getItem('user')
        const user = raw ? JSON.parse(raw) : null

        if (!user) {
            navigate('/login')
        }
    }, [navigate])

    return children
}

export default AuthGuard