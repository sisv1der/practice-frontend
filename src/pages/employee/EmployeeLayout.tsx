import EmployeeSidebar from '@/pages/employee/EmployeeSidebar'
import { Outlet } from 'react-router'

const EmployeeLayout = () => {
    return (
        <div className="flex min-h-screen overflow-hidden">
            <EmployeeSidebar/>

            <main className="flex-1 overflow-y-auto px-4">
                <Outlet/>
            </main>
        </div>
    )
}

export default EmployeeLayout