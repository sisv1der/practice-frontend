import type { Citizen } from '@/types/Citizen'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/DataTable'
import { useNavigate } from 'react-router'

export interface CitizensTableProps {
    citizens: Citizen[]
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

const CitizensTable = ({citizens}: CitizensTableProps) => {
    const navigate = useNavigate()
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={citizens} onRowClick={(citizen) => void navigate(`${citizen.id}`)}/>
        </div>
    )
}

export default CitizensTable