import AppealForm from '@/pages/appeals/form/AppealForm'
import type { AppealFormState } from '@/pages/appeals/form/AppealForm'
import { useCitizen } from '@/pages/citizens/hooks/useCitizen'
import { useParams } from 'react-router'

const AppealFormCreate = () => {
    const {citizenId: id} = useParams()

    const citizen = useCitizen(id)

    const context: AppealFormState = {
        id: '',
        title: '',
        description: '',
        status: 'NEW',
        category: 'ROADS',
        citizenId: citizen?.id ?? ''
    }

    return (
        <AppealForm mode={'create'} context={context}/>
    )
}

export default AppealFormCreate