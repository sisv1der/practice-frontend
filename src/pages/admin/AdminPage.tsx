import { getUsers } from '@/api/user'
import PaginationCustom from '@/components/PaginationCustom'
import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { Field, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import UsersTable from '@/pages/admin/UsersTable'
import { useAuth } from '@/routing/auth-context'
import type { DialogState } from '@/types/DialogState'
import type { User } from '@/types/User'
import { fromUserInfo } from '@/types/User'
import { useCallback, useEffect, useState } from 'react'

const AdminPage = () => {
    const { user, logout } = useAuth()

    const [dialogs, setDialogs] = useState<DialogState>({
        create: false,
        edit: false,
        activate: false,
        deactivate: false,
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

    const loadUsers = useCallback(async () => {
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
    }, [filters.active, filters.role, filters.username, page])
    
    useEffect(() => {
        loadUsers().catch(r => console.log(r))
    }, [filters.active, filters.role, filters.username, loadUsers, page])

    const reloadUsers = () => {
        void loadUsers()
    }

    return (
        <div className="flex">
            <aside className="flex-none">
                <Sidebar
                    pageTitle="Панель администратора"
                    footer={
                        <Button variant="destructive" onClick={logout}>
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
                                                <SelectItem value=" ">
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

                        onDeactivate={(flag: boolean) => {
                            setDialogs(prev => ({
                                ...prev,
                                deactivate: flag
                            }))
                            reloadUsers()
                        }}

                        onActivate={(flag: boolean) => {
                            setDialogs(prev => ({
                                ...prev,
                                activate: flag
                            }))
                            reloadUsers()
                        }}

                        onUpdate={(flag: boolean) => {
                            setDialogs(prev => ({
                                ...prev,
                                edit: flag
                            }))
                            reloadUsers()
                        }}

                        onChangePassword={(flag: boolean) => {
                            setDialogs(prev => ({
                                ...prev,
                                changePassword: flag
                            }))
                        }}

                        onCreate={(flag: boolean) => {
                            setDialogs(prev => ({
                                ...prev,
                                create: flag
                            }))
                            reloadUsers()
                        }}

                        dialogState={dialogs}
                    />

                    {totalPages > 1 &&
                    <section className="mt-auto">
                        <PaginationCustom
                            onNext={() => {
                                if (page < totalPages - 1) {
                                    setPage(page + 1)
                                }
                            }}

                            onPrevious={() => {
                                if (page > 0) {
                                    setPage(page - 1)
                                }
                            }}

                            onClick={(index) => setPage(index)}

                            totalPages={totalPages}

                            page={page}
                        />
                    </section>
                    }
                </div>
            </main>
        </div>
    )
}

export default AdminPage