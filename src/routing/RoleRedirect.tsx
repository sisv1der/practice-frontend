import { useNavigate } from 'react-router'
import { useEffect } from 'react'

const RoleRedirect = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const raw = localStorage.getItem('user')
        const user = raw ? JSON.parse(raw) : null

        if (!user) return

        navigate('/' + user.role.toLowerCase())
    }, [navigate])

    return null
}

export default RoleRedirect