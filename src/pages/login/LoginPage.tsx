import { LoginForm } from '@/components/LoginForm'

import type { LoginData } from '@/pages/login/types/LoginData'
import { loginUser } from '@/api/auth'
import { getMe } from '@/api/user'
import type { LoginResponse } from '@/api/auth'
import type { UserInfoResponse } from '@/api/user'
import { useAuth } from '@/routing/auth-context'
import { fromUserInfo } from '@/types/User.ts'
import { useNavigate } from 'react-router';

const LoginPage = () => {
    const navigate = useNavigate()
    const { login } = useAuth()

    const handleSubmit = async (loginData: LoginData) => {
        const data: LoginResponse = await loginUser(loginData)

        localStorage.setItem("token", data.token)

        const res: UserInfoResponse = await getMe()
        login(fromUserInfo(res))

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