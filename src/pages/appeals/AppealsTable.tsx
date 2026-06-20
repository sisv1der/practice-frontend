import { DataTable } from '@/components/DataTable'
import type { Appeal } from '@/types/Appeal'
import type { ColumnDef } from '@tanstack/react-table'

export interface AppealsTableProps {
    appeals: Appeal[]
    onRowClick?: (appeal: Appeal) => void
}

const columns: ColumnDef<Appeal>[] = [
    {
        accessorKey: 'title',
        header: 'Заголовок'
    },
    {
        accessorKey: 'status',
        header: 'Статус'
    },
    {
        accessorKey: 'category',
        header: 'Категория'
    },
    {
        accessorKey: 'createdAt',
        header: 'Дата обращения'
    },
    {
        accessorKey: 'updatedAt',
        header: 'Дата последнего обновления'
    }
]

const AppealsTable = ({appeals, onRowClick}: AppealsTableProps) => {
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={appeals} onRowClick={onRowClick}/>
        </div>
    )
}

export default AppealsTable