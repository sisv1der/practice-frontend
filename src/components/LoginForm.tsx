import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/Field"
import { Input } from "@/components/ui/Input"

import { useState } from "react"

import type { LoginData } from '@/types/LoginData'

export function LoginForm({
                            className,
                            onSubmit,
                            ...props
}: React.ComponentProps<"div"> & { onSubmit: (data: LoginData) => void;
}) {
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      onSubmit(loginData);
    } catch {
      console.log("Error during auth occurred")
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target

    setLoginData((prev) => ({
      ...prev, [name]: value,
    }))
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
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
                  onChange={handleChange}
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
                    onChange={handleChange}
                    required />
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
