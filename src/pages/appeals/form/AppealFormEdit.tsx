import AppealForm from '@/pages/appeals/form/AppealForm'
import { useAppeal } from '@/pages/appeals/hooks/useAppeal'
import { useParams } from 'react-router'

const AppealFormEdit = () => {
    const {id} = useParams()

    const appeal = useAppeal(id)

    const context = {
        id: appeal.id,
        title: appeal.title,
        description: appeal.description ?? '',
        status: appeal.status,
        category: appeal.category,
        citizenId: appeal.citizenId
    }

    if (!appeal) {
        return <div>Загрузка...</div>
    }

    return (
        <AppealForm mode={'edit'} context={context}/>
    )
}

export default AppealFormEdit