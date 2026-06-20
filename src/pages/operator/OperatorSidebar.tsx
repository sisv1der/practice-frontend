import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/ui/Button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { useAuth } from '@/routing/auth-context'
import { useLocation, useNavigate } from 'react-router'

const OperatorSidebar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const tab = location.pathname.includes('citizens')
        ? 'CITIZENS'
        : 'APPEALS'

    const {user, logout} = useAuth()

    return (
        <aside className="flex-none">
            <Sidebar
                pageTitle="Рабочее место оператора"
                footer={
                    <Button variant="destructive" onClick={logout}>
                        Выйти
                    </Button>
                }
            >
                <Tabs
                    defaultValue={tab}

                    orientation="vertical"

                    onValueChange={(value) => {
                        void navigate(`/operator/${value.toLowerCase()}`)
                    }}
                >
                    <TabsList>
                        <TabsTrigger value="APPEALS">Обращения</TabsTrigger>
                        <TabsTrigger value="CITIZENS">Граждане</TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className="flex flex-col">
                    <p className="mt-8 text-lg text-gray-800 font-semibold px-4">
                        {user.username}
                    </p>
                    <p className="text-lg text-gray-800 font-semibold px-4">
                        {user.firstName + ' ' + user.lastName}
                    </p>
                </div>
            </Sidebar>
        </aside>
    )
}

export default OperatorSidebar