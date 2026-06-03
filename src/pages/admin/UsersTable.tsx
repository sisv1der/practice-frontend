import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/ContextMenu'
import type { DialogState } from '@/pages/admin/AdminPage'
import ActivateUserDialog from '@/pages/admin/dialogs/ActivateUserDialog'
import ChangePasswordDialog from '@/pages/admin/dialogs/ChangePasswordDialog'
import CreateUserDialog from '@/pages/admin/dialogs/CreateUserDialog'
import DeactivateUserDialog from '@/pages/admin/dialogs/DeactivateUserDialog'
import EditUserDialog from '@/pages/admin/dialogs/EditUserDialog'
import { fromUserInfo } from '@/types/User'
import type { User } from '@/types/User'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { activateUser, createUser, deactivateUser, updateUser } from '@/api/user'
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
    onCreate: (flag: boolean, user: User) => void
    onUpdate: (flag: boolean, user: User) => void
    onActivate: (flag: boolean, id: string) => void
    onDeactivate: (flag: boolean, id: string) => void
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
        await deactivateUser(selectedUser.id)
        onDeactivate(false, selectedUser.id)
        setSelectedUser(undefined)
    }

    const handleUserActivate = async () => {
        await activateUser(selectedUser.id)
        onActivate(false, selectedUser.id)
        setSelectedUser(undefined)
    }

    const handleUpdateUser = async () => {
        const res = await updateUser(
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

        onUpdate(false, fromUserInfo(res))
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

    const handleCreateUser = async () => {
        const res = await createUser({
            username: formState.username,
            firstName: formState.firstName,
            lastName: formState.lastName,
            password: formState.password,
            role: formState.role
        })

        onCreate(false, fromUserInfo(res))
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
                        {users.map((user) => (
                            <ContextMenu key={user.id}>
                                <ContextMenuTrigger asChild>
                                    <TableRow className="cursor-pointer">
                                        <TableCell className="font-medium">{user.id}</TableCell>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>{user.lastName} {user.firstName}</TableCell>
                                        <TableCell>{user.isActive ? 'Активен' : 'Не активен'}</TableCell>
                                        <TableCell>{user.createdAt.toLocaleString()}</TableCell>
                                    </TableRow>
                                </ContextMenuTrigger>
                                <ContextMenuContent>
                                    <ContextMenuItem
                                        onClick={() => {
                                            setSelectedUser(user)
                                            setFormState({
                                                username: user.username,
                                                firstName: user.firstName,
                                                lastName: user.lastName,
                                                role: user.role,
                                                isActive: user.isActive
                                            })
                                            onUpdate(true)
                                        }}
                                    >
                                        Изменить
                                    </ContextMenuItem>
                                    <ContextMenuItem
                                        onClick={() => {
                                            setSelectedUser(user)
                                            setFormState({
                                                username: user.username,
                                                firstName: user.firstName,
                                                lastName: user.lastName,
                                                role: user.role,
                                                isActive: user.isActive
                                            })
                                            onChangePassword(true)
                                        }}
                                    >
                                        Изменить пароль
                                    </ContextMenuItem>

                                    {user.isActive ?
                                        <ContextMenuItem
                                            onClick={() => {
                                                setSelectedUser(user)
                                                onDeactivate(false)
                                            }}
                                            variant="destructive"
                                        >
                                            Деактивировать
                                        </ContextMenuItem>
                                        :
                                        <ContextMenuItem
                                            onClick={() => {
                                                setSelectedUser(user)
                                                onActivate(false)
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
                open={dialogState.deactivateUser}

                onOpenChange={(flag) => {
                    onDeactivate(flag)
                }}

                handleUserDeactivate={handleUserDeactivate}
            />

            <ActivateUserDialog
                open={dialogState.activateUser}

                onOpenChange={(flag) => {
                    onActivate(flag)
                }}

                handleUserActivate={handleUserActivate}
            />

            <EditUserDialog
                open={dialogState.editUser}

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
                open={dialogState.createUser}

                onOpenChange={(flag: boolean) => {
                    onCreate(flag)
                }}

                handleCreateUser={handleCreateUser}
            />
        </section>
    )
}

export default UsersTable