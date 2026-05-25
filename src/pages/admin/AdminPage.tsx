import { useNavigate } from 'react-router'
import type { User } from '../../src/types/User'
import { Button } from '../../../components/ui/Button'
import Sidebar from '../../../components/Sidebar'
import { useEffect, useState } from 'react'
import { FieldLabel, FieldLegend, FieldSet, Field } from '../../../components/ui/Field'
import { Input } from '../../../components/ui/Input'
import { SelectTrigger, Select, SelectContent, SelectItem, SelectValue } from '../../../components/ui/Select'
import { Checkbox } from '../../../components/ui/Checkbox'
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from '../../../components/ui/Table'
import { ContextMenuContent, ContextMenuItem, ContextMenuTrigger, ContextMenu } from '../../../components/ui/ContextMenu'
import { Pagination } from "@/components/ui/pagination";
import {
    PaginationContent,
    PaginationItem, PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "../../../components/ui/Pagination.tsx";
import { deleteUser, updateUser } from '@/src/api/user'
import type { UpdateUserRequest} from '@/src/api/user'

const AdminPage = () => {
    const navigate = useNavigate()

    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(10)

    const tempUsers: User[] = [
        {
            id: '1',
            username: 'user1',
            firstName: 'first_name_1',
            lastName: 'last_name_1',
            role: 'EMPLOYEE',
            isActive: true,
            createdAt: new Date()
        },
        {
            id: '2',
            username: 'user2',
            firstName: 'first_name_2',
            lastName: 'last_name_2',
            role: 'ADMIN',
            isActive: true,
            createdAt: new Date()
        },
        {
            id: '3',
            username: 'user3',
            firstName: 'first_name_3',
            lastName: 'last_name_3',
            role: 'OPERATOR',
            isActive: true,
            createdAt: new Date()
        },
    ]

    const [users, setUsers] = useState<User[]>(tempUsers)

    const editUser = (updatedUser: User) => {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === updatedUser.id
                    ? updatedUser
                    : user
            )
        )
    }

    const handleUpdateUser = async (id: string, updatedUser: UpdateUserRequest) => {
        const res = await updateUser(id, updatedUser)

        editUser(res)
    }

    const removeUser = (id: string) => {
        setUsers((prev) =>
            prev.filter((user) =>
                user.id != id
            )
        )
    }

    const handleDeleteUser = async (id: string) => {
        deleteUser(id).then(removeUser(id))
    }

    const raw = localStorage.getItem('user')
    const user: User = raw ? JSON.parse(raw) : null
    useEffect(() => {
        if (!user) navigate('/')
    }, [navigate, user])
    if (!user) return null

    return (
        <div className="flex">
            <aside className="flex-none">
                <Sidebar
                    pageTitle="Панель администратора"
                    footer={
                        <Button variant="destructive">
                            Выйти
                        </Button>
                    }
                >
                    <p className="mt-8 text-lg text-gray-800 font-semibold px-4">
                        {user.username}
                    </p>
                    <p className="text-lg text-gray-800 font-semibold px-4">
                        {user.firstName + ' ' + user.lastName}
                    </p>
                </Sidebar>
            </aside>

            <main className="flex-auto overflow-y-auto">
                <div className="flex flex-col gap-6 p-6 min-h-full">
                    <section className="flex flex-row justify-between items-center">
                        <h2 className="text-xl text-gray-900 font-semibold">
                            Пользователи
                        </h2>
                        <div>
                            <Button>
                                Создать
                            </Button>
                        </div>
                    </section>

                    <section>
                        <form>
                            <FieldSet>
                                <FieldLegend>Фильтрация</FieldLegend>
                                <div className="flex flex-wrap items-center gap-4">
                                    <Field className="flex-1 min-w-64">
                                        <FieldLabel htmlFor="search-input">
                                            Поиск
                                        </FieldLabel>
                                        <Input
                                            id="search-input"
                                            placeholder="Иванов"
                                        />
                                    </Field>

                                    <Field className="w-52">
                                        <FieldLabel htmlFor="user-role">
                                            Роль
                                        </FieldLabel>
                                        <Select defaultValue="">
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
                                                <SelectItem>
                                                    Все роли
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </Field>

                                    <Field
                                        orientation="horizontal"
                                        className="w-fit pt-6"
                                    >
                                        <Checkbox id="active-only" />
                                        <FieldLabel
                                            htmlFor="active-only"
                                            className="font-normal"
                                        >
                                            Только активные
                                        </FieldLabel>
                                    </Field>
                                </div>
                            </FieldSet>
                        </form>
                    </section>

                    <section>
                        <Table>
                            <TableHeader>

                                        <TableRow>
                                            <TableHead>Идентификатор</TableHead>
                                            <TableHead>Имя пользователя</TableHead>
                                            <TableHead>Роль</TableHead>
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
                                                <TableCell>{user.isActive ? 'Активен' : 'Не активен'}</TableCell>
                                                <TableCell>{user.createdAt.toLocaleString()}</TableCell>
                                            </TableRow>
                                        </ContextMenuTrigger>
                                        <ContextMenuContent>
                                            <ContextMenuItem
                                                onClick={() => {
                                                    // открыть модальное окно

                                                    handleUpdateUser(user.id)
                                                }}
                                            >
                                                Изменить
                                            </ContextMenuItem>
                                            <ContextMenuItem
                                                onClick={() => {
                                                    // открыть модальное окно

                                                    handleDeleteUser(user.id)
                                                }}
                                                variant="destructive"
                                            >
                                                Деактивировать
                                            </ContextMenuItem>
                                        </ContextMenuContent>
                                    </ContextMenu>
                                ))}
                            </TableBody>
                        </Table>
                    </section>

                    <section className="mt-auto">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => {
                                            if (page > 0) {
                                                setPage(page - 1)
                                            }
                                        }}
                                        text="Назад"
                                    />
                                </PaginationItem>
                                {Array.from({ length: totalPages}).map((_, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink
                                            isActive={page === index}
                                            onClick={() => setPage(index)}
                                        >
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => {
                                            if (page < totalPages - 1) {
                                                setPage(page + 1)
                                            }
                                        }}
                                        text="Вперёд"
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default AdminPage