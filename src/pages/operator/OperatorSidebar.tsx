import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/ui/Button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import type { User } from '@/types/User'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

const OperatorSidebar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const tab = location.pathname.includes('citizens')
        ? 'CITIZENS'
        : 'APPEALS'

    const raw = localStorage.getItem('user')
    const user: User | null = raw ? (JSON.parse(raw) as User) : null
    useEffect(() => {
        if (!user) void navigate('/')
    }, [navigate, user])
    if (!user) return null

    return (
        <aside className="flex-none">
            <Sidebar
                pageTitle="Рабочее место оператора"
                footer={
                    <Button variant="destructive">
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