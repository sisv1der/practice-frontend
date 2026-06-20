import { claimAppeal } from '@/api/appeal'
import PaginationCustom from '@/components/PaginationCustom'
import { Field, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { useAppeals } from '@/pages/appeals/hooks/useAppeals'
import EmployeeAppealsTable from '@/pages/employee/EmployeeAppealsTable'
import type { Appeal, AppealStatus } from '@/types/Appeal'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const EmployeeAppealsListPage = () => {
    const navigate = useNavigate()

    const [ filters, setFilters ] = useState({
        search: '',
        status: '',
        category: ''
    })

    const [ page, setPage ] = useState<number>(0)

    const {appeals, totalPages, refetch} = useAppeals(
        filters.search,
        filters.status as AppealStatus,
        filters.category,
        page,
        10
    )

    const handleClaim = async (appeal: Appeal) => {
        await claimAppeal(appeal.id)
        await refetch()
    }

    return (
        <div className="flex flex-col min-h-full gap-6">
            <section className="flex flex-row justify-between items-center">
                <h2 className="text-xl font-semibold">
                    Обращения
                </h2>
            </section>

            <section>
                <FieldSet>
                    <FieldLegend>Фильтрация</FieldLegend>

                    <div className="flex flex-wrap items-center gap-4">
                        <Field className="flex-1 min-w-64">
                            <FieldLabel htmlFor="search-input">
                                Поиск
                            </FieldLabel>

                            <Input
                                id="search-input"
                                onChange={(e) =>
                                    setFilters(prev => ({
                                        ...prev,
                                        search: e.target.value
                                    }))
                                }
                            />
                        </Field>
                        <Field className="w-52">
                            <FieldLabel htmlFor="appeal-status">
                                Роль
                            </FieldLabel>
                            <Select
                                defaultValue=""
                                onValueChange={(value) => {
                                    setFilters(prev => ({
                                        ...prev,
                                        status: value.trim()
                                    }))
                                }}
                            >
                                <SelectTrigger id="appeal-status">
                                    <SelectValue placeholder="Статус"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="NEW">
                                        Новое
                                    </SelectItem>
                                    <SelectItem value="IN_PROGRESS">
                                        В обработке
                                    </SelectItem>
                                    <SelectItem value="DONE">
                                        Завершено
                                    </SelectItem>
                                    <SelectItem value="REJECTED">
                                        Отказано
                                    </SelectItem>
                                    <SelectItem value=" ">
                                        Любой
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field className="w-52">
                            <FieldLabel htmlFor="appeal-category">
                                Категория
                            </FieldLabel>
                            <Select
                                defaultValue=""
                                onValueChange={(value) => {
                                    setFilters(prev => ({
                                        ...prev,
                                        category: value
                                    }))
                                }}
                            >
                                <SelectTrigger id="appeal-category">
                                    <SelectValue placeholder="Категория"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ROADS">
                                        Дороги
                                    </SelectItem>
                                    <SelectItem value="COMMUNAL_SERVICES">
                                        Коммунальные услуги
                                    </SelectItem>
                                    <SelectItem value="LIGHTING">
                                        Освещение
                                    </SelectItem>
                                    <SelectItem value="TRASH">
                                        Мусор
                                    </SelectItem>
                                    <SelectItem value="IMPROVEMENT">
                                        Предложения по благоустройству
                                    </SelectItem>
                                    <SelectItem value="OTHER">
                                        Другое
                                    </SelectItem>
                                    <SelectItem value=" ">
                                        Любая
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>
                </FieldSet>
            </section>

            <EmployeeAppealsTable
                appeals={appeals}

                onRowClick={(appeal: Appeal) => void navigate(`${appeal.id}`)}

                onClaimClick={(appeal: Appeal) => void handleClaim(appeal)}
            />

            <section className="mt-auto">
                <PaginationCustom
                    onNext={() => {
                        if (page < totalPages - 1) setPage(page + 1)
                    }}
                    onPrevious={() => {
                        if (page > 0) setPage(page - 1)
                    }}
                    onClick={setPage}
                    totalPages={totalPages}
                    page={page}
                />
            </section>
        </div>
    )
}

export default EmployeeAppealsListPage