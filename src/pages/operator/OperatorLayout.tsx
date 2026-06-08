import OperatorSidebar from '@/pages/operator/OperatorSidebar'
import { Outlet } from 'react-router'

const OperatorLayout = () => {
    return (
        <div className="flex gap-4">
            <OperatorSidebar/>

            <main className="flex-auto py-6 px-4 h-screen">
                <Outlet/>
            </main>
        </div>
    )
}

export default OperatorLayout