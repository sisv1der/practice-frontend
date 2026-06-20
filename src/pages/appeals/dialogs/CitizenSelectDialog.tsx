import { DataTable } from '@/components/DataTable'
import PaginationCustom from '@/components/PaginationCustom'
import { Field, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'
import { useCitizens } from '@/pages/citizens/hooks/useCitizens'
import type { CitizenFilters } from '@/pages/citizens/hooks/useCitizens'
import type { Citizen } from '@/types/Citizen'
import {
    Dialog,
    DialogTrigger,
    DialogTitle,
    DialogContent,
    DialogHeader
} from '@/components/ui/Dialog'
import type { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'

export interface CitizenSelectDialogProps {
    open: boolean
    onOpenChange: (flag: boolean) => void
    handleSelect: (citizen: Citizen) => void
}

const columns: ColumnDef<Citizen>[] = [
    {
        accessorKey: 'fullName',
        header: 'Имя'
    },
    {
        accessorKey: 'email',
        header: 'Электронная почта'
    },
    {
        accessorKey: 'phoneNumber',
        header: 'Телефон'
    }
]

const CitizenSelectDialog = ({
                                 open,
                                 onOpenChange,
                                 handleSelect
                             }: CitizenSelectDialogProps) => {
    const [ filters, setFilters ] = useState<CitizenFilters>({
        search: ''
    })

    const [ page, setPage ] = useState<number>(0)
    const {citizens, totalPages} = useCitizens(page, filters)

    const handleSubmit = (citizen: Citizen) => {
        handleSelect(citizen)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger/>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Выбор гражданина
                    </DialogTitle>
                </DialogHeader>

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

                <DataTable columns={columns} data={citizens} onRowClick={handleSubmit}/>

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
            </DialogContent>
        </Dialog>
    )
}

export default CitizenSelectDialog