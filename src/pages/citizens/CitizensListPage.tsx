import { createCitizen, getCitizens } from '@/api/citizen'
import PaginationCustom from '@/components/PaginationCustom'
import { Button } from '@/components/ui/Button'
import { Field, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/Field'
import CitizensTable from '@/pages/citizens/CitizensTable'
import CreateCitizenDialog from '@/pages/citizens/dialogs/CreateCitizenDialog'
import type { CitizenFormState } from '@/pages/citizens/types/CitizenFormState'
import type { Citizen } from '@/types/Citizen'
import type { DialogState } from '@/types/DialogState'
import { useCallback, useEffect, useState } from 'react'
import { Input } from '@/components/ui/Input'

const CitizensListPage = () => {
    const [ citizens, setCitizens ] = useState<Citizen[]>([])

    const [ totalPages, setTotalPages ] = useState<number>(10)
    const [ page, setPage ] = useState<number>(0)

    const [ filters, setFilters ] = useState({
        searchInput: undefined
    })

    const [ dialogs, setDialogs ] = useState<DialogState>({
        create: false
    })

    const loadCitizens = useCallback(async () => {
        const PAGE_SIZE = 10

        const data = await getCitizens({
            search: filters.searchInput !== '' ? filters.searchInput : undefined,
            page,
            size: PAGE_SIZE
        })

        setCitizens(data.content)
        setTotalPages(data.totalPages)
    }, [ filters.searchInput, page ])

    const reloadCitizens = () => {
        loadCitizens().catch(r => console.log(r))
    }

    const handleCreate = async (formState: CitizenFormState) => {
        await createCitizen({
            fullName: formState.fullName,
            phoneNumber: formState.phoneNumber,
            email: formState.email
        })

        reloadCitizens()
    }

    useEffect(() => {
        loadCitizens().catch(r => console.log(r))
    }, [ filters.searchInput, loadCitizens, page ])

    return (
        <div className="flex flex-col min-h-full gap-6">
            <section className="flex flex-row justify-between items-center">
                <h2 className="text-xl font-semibold">
                    Граждане
                </h2>

                <Button onClick={() => setDialogs(prev => ({
                    ...prev,
                    create: true
                }))}>
                    Создать
                </Button>
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
                                    onChange={(e) =>
                                        setFilters(prev => ({
                                            ...prev,
                                            searchInput: e.target.value
                                        }))
                                    }
                                />
                            </Field>
                        </div>
                    </FieldSet>
                </form>
            </section>

            <CitizensTable citizens={citizens}/>

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

            <CreateCitizenDialog
                open={dialogs.create}
                onOpenChange={(flag) =>
                    setDialogs(prev => ({...prev, create: flag}))
                }
                handleCreate={handleCreate}
            />
        </div>
    )
}

export default CitizensListPage