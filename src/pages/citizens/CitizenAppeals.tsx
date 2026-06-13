import PaginationCustom from '@/components/PaginationCustom'
import { Button } from '@/components/ui/Button'
import AppealsTable from '@/pages/appeals/AppealsTable'
import { useCitizenAppeals } from '@/pages/citizens/hooks/useCitizenAppeals'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import type { Appeal } from '@/types/Appeal'

const CitizenAppeals = () => {
    const navigate = useNavigate()

    const {id} = useParams()

    const [ page, setPage ] = useState(0)

    const {appeals, totalPages} = useCitizenAppeals(id, page, 10)

    const goBack = () => {
        void navigate(-1)
    }

    const openAppealPage = (appeal: Appeal) => {
        void navigate(appeal.id)
    }

    const openCreateAppealPage = () => {
        void navigate(`new`)
    }

    return (
        <div className="flex flex-col min-h-full gap-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                    Обращения гражданина
                </h2>

                <Button
                    type="button"
                    onClick={openCreateAppealPage}
                >
                    Создать новое обращение
                </Button>

                <Button
                    type="button"
                    onClick={goBack}
                >
                    Назад
                </Button>
            </div>

            <AppealsTable appeals={appeals} onRowClick={openAppealPage}/>

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

export default CitizenAppeals