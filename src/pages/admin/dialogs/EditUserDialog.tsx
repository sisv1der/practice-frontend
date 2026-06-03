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

export interface EditUserDialogProps {
    open: boolean
    onOpenChange: (flag: boolean) => void
    handleEditUser: () => Promise<void>
    inputFormState: FormState
}

const EditUserDialog = ({
    open,
    onOpenChange,
    handleEditUser,
    inputFormState
}: EditUserDialogProps) => {
    const [editState, setEditState] = useState<FormState>(inputFormState)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setEditState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <form
                onSubmit={() => {
                    void handleEditUser()
                }}
            >
                <DialogTrigger/>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>
                            Редактирование пользователя
                        </DialogTitle>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="username-edit">Логин пользователя</FieldLabel>
                            <Input
                                id="username-edit"
                                name="username"
                                value={editState.username}
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
                                value={editState.firstName}
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
                                value={editState.lastName}
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
                                value={editState.role}
                                onValueChange={(value) =>
                                    handleSelectChange('role', value)
                                }
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
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Отмена</Button>
                        </DialogClose>

                        <Button type="submit">Сохранить изменения</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default EditUserDialog