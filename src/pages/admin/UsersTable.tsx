import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/ContextMenu'
import type { DialogState } from '@/types/DialogState'
import ActivateUserDialog from '@/pages/admin/dialogs/ActivateUserDialog'
import ChangePasswordDialog from '@/pages/admin/dialogs/ChangePasswordDialog'
import CreateUserDialog from '@/pages/admin/dialogs/CreateUserDialog'
import DeactivateUserDialog from '@/pages/admin/dialogs/DeactivateUserDialog'
import EditUserDialog from '@/pages/admin/dialogs/EditUserDialog'
import type { User } from '@/types/User'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { changeUserStatus, createUser, updateUser } from '@/api/user'
import type { Role } from '@/api/user'

export interface FormState {
    username: string
    firstName: string
    lastName: string
    password?: string
    role: Role
    isActive: boolean
}

export interface UsersTableProps {
    users: User[]
    onCreate: (flag: boolean) => void
    onUpdate: (flag: boolean) => void
    onActivate: (flag: boolean) => void
    onDeactivate: (flag: boolean) => void
    onChangePassword: (flag: boolean) => void
    dialogState: DialogState
}

const UsersTable = ({
    users,
    onCreate,
    onUpdate,
    onActivate,
    onDeactivate,
    onChangePassword,
    dialogState
}: UsersTableProps) => {
    const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined)
    const [formState, setFormState] = useState<FormState>({
        username: '',
        firstName: '',
        lastName: '',
        password: undefined,
        role: 'EMPLOYEE',
        isActive: true
    })

    const resetFormState = () => {
        setFormState({
            username: '',
            firstName: '',
            lastName: '',
            password: undefined,
            role: 'EMPLOYEE',
            isActive: true
        })
    }

    const handleUserDeactivate = async () => {
        await changeUserStatus(selectedUser.id, false)
        onDeactivate(false)
        setSelectedUser(undefined)
    }

    const handleUserActivate = async () => {
        await changeUserStatus(selectedUser.id, true)
        onActivate(false)
        setSelectedUser(undefined)
    }

    const handleUpdateUser = async (formState: FormState) => {
        await updateUser(
            selectedUser.id,
            {
                username: formState.username,
                firstName: formState.firstName,
                lastName: formState.lastName,
                password: formState.password,
                role: formState.role,
                isActive: formState.isActive
            }
        )

        onUpdate(false)
        resetFormState()
        setSelectedUser(undefined)
    }

    const handlePasswordChange = async (password: string) => {
        await updateUser(
            selectedUser.id,
            {
                username: formState.username,
                firstName: formState.firstName,
                lastName: formState.lastName,
                password: password ?? null,
                role: formState.role,
                isActive: formState.isActive
            }
        )

        onChangePassword(false)
        setSelectedUser(undefined)
        resetFormState()
    }

    const handleCreateUser = async (formState: FormState) => {
        await createUser({
            username: formState.username,
            firstName: formState.firstName,
            lastName: formState.lastName,
            password: formState.password,
            role: formState.role
        })

        onCreate(false)
        resetFormState()
    }

    return (
        <section>
            <div className="flex flex-col gap-4">
                <Button
                    onClick={() => onCreate(true)}

                    className="self-end"
                >
                    Создать
                </Button>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Идентификатор</TableHead>
                            <TableHead>Логин</TableHead>
                            <TableHead>Роль</TableHead>
                            <TableHead>Имя</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead>Создан</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((u) => (
                            <ContextMenu key={u.id}>
                                <ContextMenuTrigger asChild>
                                    <TableRow className="cursor-pointer">
                                        <TableCell className="font-medium">{u.id}</TableCell>
                                        <TableCell>{u.username}</TableCell>
                                        <TableCell>{u.role}</TableCell>
                                        <TableCell>{u.lastName} {u.firstName}</TableCell>
                                        <TableCell>{u.isActive ? 'Активен' : 'Не активен'}</TableCell>
                                        <TableCell>{u.createdAt.toLocaleString()}</TableCell>
                                    </TableRow>
                                </ContextMenuTrigger>
                                <ContextMenuContent>
                                    <ContextMenuItem
                                        onClick={() => {
                                            setSelectedUser(u)
                                            setFormState({
                                                username: u.username,
                                                firstName: u.firstName,
                                                lastName: u.lastName,
                                                role: u.role,
                                                isActive: u.isActive
                                            })
                                            onUpdate(true)
                                        }}
                                    >
                                        Изменить
                                    </ContextMenuItem>
                                    <ContextMenuItem
                                        onClick={() => {
                                            setSelectedUser(u)
                                            setFormState({
                                                username: u.username,
                                                firstName: u.firstName,
                                                lastName: u.lastName,
                                                role: u.role,
                                                isActive: u.isActive
                                            })
                                            onChangePassword(true)
                                        }}
                                    >
                                        Изменить пароль
                                    </ContextMenuItem>

                                    {u.isActive ?
                                        <ContextMenuItem
                                            onClick={() => {
                                                setSelectedUser(u)
                                                onDeactivate(true)
                                            }}
                                            variant="destructive"
                                        >
                                            Деактивировать
                                        </ContextMenuItem>
                                        :
                                        <ContextMenuItem
                                            onClick={() => {
                                                setSelectedUser(u)
                                                onActivate(true)
                                            }}
                                        >
                                            Активировать
                                        </ContextMenuItem>}

                                </ContextMenuContent>
                            </ContextMenu>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <DeactivateUserDialog
                open={dialogState.deactivate}

                onOpenChange={(flag) => {
                    onDeactivate(flag)
                }}

                handleUserDeactivate={handleUserDeactivate}
            />

            <ActivateUserDialog
                open={dialogState.activate}

                onOpenChange={(flag) => {
                    onActivate(flag)
                }}

                handleUserActivate={handleUserActivate}
            />

            <EditUserDialog
                open={dialogState.edit}

                onOpenChange={(flag) => {
                    onUpdate(flag)
                }}

                handleEditUser={handleUpdateUser}

                inputFormState={formState}
            />

            <ChangePasswordDialog
                open={dialogState.changePassword}

                onOpenChange={(flag) => {
                    onChangePassword(flag)
                }}

                handlePasswordChange={handlePasswordChange}
            />

            <CreateUserDialog
                open={dialogState.create}

                onOpenChange={(flag: boolean) => {
                    onCreate(flag)
                }}

                handleCreateUser={handleCreateUser}
            />
        </section>
    )
}

export default UsersTable