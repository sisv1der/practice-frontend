import { getUsers } from '@/api/user'
import UsersTable from '@/pages/admin/UsersTable'
import { fromUserInfo } from '@/types/User'
import { useNavigate } from 'react-router'
import type { User } from '@/types/User'
import { Button } from '@/components/ui/Button'
import Sidebar from '@/components/Sidebar'
import { useEffect, useState } from 'react'
import { FieldLabel, FieldLegend, FieldSet, Field } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'
import { SelectTrigger, Select, SelectContent, SelectItem, SelectValue } from '@/components/ui/Select'
import { Checkbox } from '@/components/ui/Checkbox'
import {
    Pagination,
    PaginationContent,
    PaginationItem, PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/Pagination";

export interface DialogState {
    createUser: false
    editUser: false
    activateUser: false
    deactivateUser: false
    changePassword: false
}

const AdminPage = () => {
    const navigate = useNavigate()

    const [dialogs, setDialogs] = useState<DialogState>({
        createUser: false,
        editUser: false,
        activateUser: false,
        deactivateUser: false,
        changePassword: false,
    })

    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(10)

    const [filters, setFilters] = useState({
        username: undefined,
        role: undefined,
        active: undefined
    })
    
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const loadUsers = async () => {
            const PAGE_SIZE = 10

            const data = await getUsers({
                username: filters.username !== '' ? filters.username : undefined,
                role: filters.role,
                active: filters.active,
                page,
                size: PAGE_SIZE
            })
            setUsers(data.content.map(fromUserInfo))
            setTotalPages(data.totalPages)
        }

        loadUsers().catch(r => console.log(r))
    }, [filters.active, filters.role, filters.username, page])

    const raw = localStorage.getItem('user')
    const user: User | null = raw ? (JSON.parse(raw) as User) : null
    useEffect(() => {
        if (!user) void navigate('/')
    }, [navigate, user])
    if (!user) return null

    const editUserStatus = (isActive: boolean, id: string) => {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === id
                    ? { ...user, isActive }
                    : user
            )
        )
    }

    const editUser = (updatedUser: User) => {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === updatedUser.id
                    ? updatedUser
                    : user
            )
        )
    }

    const addUser = (user: User) => {
        setUsers(prev => [...prev, user])
    }

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
                                            onChange={(e) =>
                                                setFilters(prev => ({
                                                    ...prev,
                                                    username: e.target.value
                                                }))
                                            }
                                        />
                                    </Field>

                                    <Field className="w-52">
                                        <FieldLabel htmlFor="user-role">
                                            Роль
                                        </FieldLabel>
                                        <Select
                                            defaultValue=""
                                            onValueChange={(value) => {
                                                setFilters(prev => ({
                                                    ...prev,
                                                    role: value
                                                }))
                                            }}
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
                                        <Checkbox
                                            id="active-only"
                                            onCheckedChange={(checked) => {
                                                setFilters(prev => ({
                                                    ...prev,
                                                    active: checked
                                                }))
                                            }}
                                        />
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

                    <UsersTable
                        users={users}

                        onDeactivate={(flag: boolean, id: string) => {
                            setDialogs(prev => ({
                                ...prev,
                                deactivateUser: flag
                            }))
                            editUserStatus(false, id)
                        }}

                        onActivate={(flag: boolean, id: string) => {
                            setDialogs(prev => ({
                                ...prev,
                                activateUser: flag
                            }))
                            editUserStatus(true, id)
                        }}

                        onUpdate={(flag: boolean, user: User) => {
                            setDialogs(prev => ({
                                ...prev,
                                editUser: flag
                            }))
                            editUser(user)
                        }}

                        onChangePassword={(flag: boolean) => {
                            setDialogs(prev => ({
                                ...prev,
                                changePassword: flag
                            }))
                        }}

                        onCreate={(flag: boolean, user: User) => {
                            setDialogs(prev => ({
                                ...prev,
                                createUser: flag
                            }))
                            addUser(user)
                        }}

                        dialogState={dialogs}
                    />

                    {totalPages > 1 &&
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
                    }
                </div>
            </main>
        </div>
    )
}

export default AdminPage