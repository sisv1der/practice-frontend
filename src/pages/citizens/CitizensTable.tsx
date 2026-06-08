import type { Citizen } from '@/types/Citizen'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/DataTable'

export interface CitizensTableProps {
    citizens: Citizen[]
}

const columns: ColumnDef<Citizen[]> = [
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

const CitizensTable = ({citizens}: CitizensTableProps) => {
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={citizens}/>
        </div>
    )
}

export default CitizensTable