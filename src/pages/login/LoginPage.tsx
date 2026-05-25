import { LoginForm } from '@/components/LoginForm'

import type { LoginData } from '@/src/types/LoginData'
import { login } from '@/src/api/auth'
import { getMe } from '@/src/api/user'
import type { LoginResponse } from '@/src/api/auth'
import type { UserInfoResponse } from '@/src/api/user'
import { fromUserInfo } from '@/src/types/User'
import { useNavigate } from 'react-router';

const LoginPage = () => {
    const navigate = useNavigate()

    const handleSubmit = async (loginData: LoginData) => {
        const data: LoginResponse = await login(loginData)

        localStorage.setItem("token", data.token)

        const user: UserInfoResponse = await getMe()
        localStorage.setItem('user', JSON.stringify(fromUserInfo(user)))

        navigate('/')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md">
                <LoginForm onSubmit={handleSubmit}/>
            </div>
        </div>
    )
}

export default LoginPage