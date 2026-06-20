import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/Card'
import {
    Field,
    FieldGroup,
    FieldLabel
} from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'

import { useState } from 'react'

import type { LoginData } from '@/pages/login/types/LoginData'

interface LoginFormProps {
    onSubmit: (data: LoginData) => void
    className?: string
}

const LoginForm = ({
                       className,
                       onSubmit
                   }: LoginFormProps) => {
    const [ loginData, setLoginData ] = useState<LoginData>({
        username: '',
        password: ''
    })

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            onSubmit(loginData)
        } catch {
            console.log('Error during auth occurred')
        }
    }

    const handleChange = (name: string, value: string) => {
        setLoginData((prev) => ({
            ...prev, [name]: value
        }))
    }

    return (
        <div className={cn('flex flex-col gap-6', className)}>
            <Card>
                <CardHeader>
                    <CardTitle>Войдите в ваш аккаунт</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="username">Имя пользователя</FieldLabel>
                                <Input
                                    name="username"
                                    value={loginData.username}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    placeholder="username1312"
                                    required
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Пароль</FieldLabel>
                                </div>
                                <Input
                                    name="password"
                                    type="password"
                                    value={loginData.password}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    required/>
                            </Field>
                            <Field>
                                <Button type="submit">Войти</Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginForm