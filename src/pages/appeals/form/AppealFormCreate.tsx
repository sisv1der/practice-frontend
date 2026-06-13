import AppealForm from '@/pages/appeals/form/AppealForm'
import { useCitizen } from '@/pages/citizens/hooks/useCitizen'
import { useParams } from 'react-router'

const AppealFormCreate = () => {
    const {citizenId: id} = useParams()

    const citizen = useCitizen(id)

    const context = {
        id: '',
        title: '',
        description: '',
        status: 'NEW',
        category: 'ROADS',
        citizenId: citizen?.id ?? ''
    }
    //
    // if (!citizen) {
    //     return <div>Загрузка...</div>
    // }

    return (
        <AppealForm mode={'create'} context={context}/>
    )
}

export default AppealFormCreate