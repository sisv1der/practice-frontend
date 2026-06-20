import { exportAppeals } from '@/api/appeal'
import PaginationCustom from '@/components/PaginationCustom'
import { Button } from '@/components/ui/Button'
import { Field, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import AppealsTable from '@/pages/appeals/AppealsTable'
import { useAppeals } from '@/pages/appeals/hooks/useAppeals'
import type { AppealStatus } from '@/types/Appeal'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const AppealsListPage = () => {
    const navigate = useNavigate()

    const [ filters, setFilters ] = useState({
        search: '',
        status: '',
        category: ''
    })

    const [ page, setPage ] = useState<number>(0)

    const {appeals, totalPages} = useAppeals(
        filters.search,
        filters.status as AppealStatus,
        filters.category,
        page,
        10
    )

    return (
        <div className="flex flex-col min-h-full gap-6">
            <section className="flex flex-row justify-between items-center">
                <h2 className="text-xl font-semibold">
                    Обращения
                </h2>

                <Button
                    onClick={() => void navigate(`new`)}
                >
                    Создать
                </Button>
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

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                void exportAppeals({
                                    search: filters.search,
                                    status: filters.status as AppealStatus,
                                    category: filters.category
                                })
                            }
                        >
                            Экспорт в Excel
                        </Button>
                    </div>
                </FieldSet>
            </section>

            <AppealsTable appeals={appeals} onRowClick={(appeal) => void navigate(`${appeal.id}`)}/>

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

export default AppealsListPage