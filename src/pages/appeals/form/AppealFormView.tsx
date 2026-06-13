import AppealForm from '@/pages/appeals/form/AppealForm'
import { useAppeal } from '@/pages/appeals/hooks/useAppeal'
import { useParams } from 'react-router'

const AppealFormView = () => {
    const {id} = useParams()

    const appeal = useAppeal(id)
    if (!appeal) {
        return <div>Загрузка...</div>
    }

    const context = {
        id: appeal.id,
        title: appeal.title,
        description: appeal.description ?? '',
        status: appeal.status,
        category: appeal.category,
        citizenId: appeal.citizenId
    }


    return (
        <AppealForm mode={'view'} context={context}/>
    )
}

export default AppealFormView