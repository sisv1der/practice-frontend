import { LoginForm } from '@/components/LoginForm'

import type { LoginData } from '@/types/LoginData'
import { login } from '@/api/auth'
import { getMe } from '@/api/user'
import type { LoginResponse } from '@/api/auth'
import type { UserInfoResponse } from '@/api/user'
import { fromUserInfo } from '@/types/User.ts'
import { useNavigate } from 'react-router';

const LoginPage = () => {
    const navigate = useNavigate()

    const handleSubmit = async (loginData: LoginData) => {
        const data: LoginResponse = await login(loginData)

        localStorage.setItem("token", data.token)

        const user: UserInfoResponse = await getMe()
        localStorage.setItem('user', JSON.stringify(fromUserInfo(user)))

        void navigate('/')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md">
                <LoginForm onSubmit={(data: LoginData) => void handleSubmit(data)}/>
            </div>
        </div>
    )
}

export default LoginPage