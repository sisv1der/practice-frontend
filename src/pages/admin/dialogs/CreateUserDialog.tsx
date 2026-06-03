import { Button } from '@/components/ui/Button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/Dialog'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import type { FormState } from '@/pages/admin/UsersTable'
import { useState } from 'react'

export interface CreateUserDialogProps {
    open: boolean
    onOpenChange: (flag: boolean) => void
    handleCreateUser: () => Promise<void>
}

const CreateUserDialog = ({
    open,
    onOpenChange,
    handleCreateUser,
}: CreateUserDialogProps) => {
    const [errors, setErrors] = useState({
        confirmPassword: '',
    })

    const [createState, setCreateState] = useState<FormState>({
        username: '',
        firstName: '',
        lastName: '',
        password: undefined,
        role: 'EMPLOYEE',
        isActive: true
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCreateState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setCreateState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogTrigger/>
            <DialogContent>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        void handleCreateUser()
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>
                            Создание пользователя
                        </DialogTitle>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="username-edit">Логин пользователя</FieldLabel>
                            <Input
                                id="username-edit"
                                name="username"
                                onChange={(e) =>
                                    handleInputChange(e)
                                }
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="first-name-edit">Имя</FieldLabel>
                            <Input
                                id="first-name-edit"
                                name="firstName"
                                onChange={(e) =>
                                    handleInputChange(e)
                                }
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="last-name-edit">Фамилия</FieldLabel>
                            <Input
                                id="last-name-edit"
                                name="lastName"
                                onChange={(e) =>
                                    handleInputChange(e)
                                }
                                required
                            />
                        </Field>
                        <Field className="w-52">
                            <FieldLabel htmlFor="user-role">
                                Роль
                            </FieldLabel>
                            <Select
                                name="role"
                                onValueChange={(value) => {
                                    handleSelectChange('role', value)
                                }}
                                required
                            >
                                <SelectTrigger id="user-role">
                                    <SelectValue placeholder="Роль" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="EMPLOYEE">
                                        Сотрудник
                                    </SelectItem>
                                    <SelectItem value="OPERATOR">
                                        Оператор
                                    </SelectItem>
                                    <SelectItem value="ADMIN">
                                        Администратор
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Пароль</FieldLabel>
                            <Input
                                name="password"
                                type="password"
                                onChange={(e) =>
                                    handleInputChange(e)
                                }
                                required />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Подтверждение пароля</FieldLabel>
                            <Input
                                className={errors.confirmPassword ? "border-red-500" : ""}
                                name="password"
                                type="password"
                                onChange={(e) =>
                                    setErrors(prev => ({
                                            ...prev,
                                            confirmPassword: e.target.value !== createState.password
                                                ? 'Пароли не совпадают'
                                                : ''
                                        })
                                    )
                                }
                                required />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Отмена</Button>
                        </DialogClose>
                        <Button type="submit">Создать</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateUserDialog