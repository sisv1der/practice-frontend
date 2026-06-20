import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/routing/auth-context'

const EmployeeSidebar = () => {

    const {user, logout} = useAuth()

    return (
        <aside className="flex-none">
            <Sidebar
                pageTitle="Рабочее место cотрудника"
                footer={
                    <Button variant="destructive" onClick={logout}>
                        Выйти
                    </Button>
                }
            >
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

export default EmployeeSidebar