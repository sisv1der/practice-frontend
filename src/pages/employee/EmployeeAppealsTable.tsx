import { DataTable } from '@/components/DataTable'
import { Button } from '@/components/ui/Button'
import type { Appeal } from '@/types/Appeal'
import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

export interface EmployeeAppealsTableProps {
    appeals: Appeal[]
    onRowClick?: (appeal: Appeal) => void
    onClaimClick?: (appeal: Appeal) => void
}

const createColumns = (
    onClaim: (appeal: Appeal) => void
): ColumnDef<Appeal>[] => [
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
    },
    {
        id: 'actions',
        cell: ({row}) => {
            const appeal = row.original

            return (
                <Button onClick={() => onClaim(appeal)} disabled={appeal.status !== 'NEW'}>
                    Взять
                </Button>
            )
        }
    }
]

const EmployeeAppealsTable = ({appeals, onRowClick, onClaimClick}: EmployeeAppealsTableProps) => {
    const columns = useMemo(
        () => createColumns(onClaimClick),
        [ onClaimClick ]
    )

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={appeals} onRowClick={onRowClick}/>
        </div>
    )
}

export default EmployeeAppealsTable