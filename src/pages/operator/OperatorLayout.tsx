import OperatorSidebar from '@/pages/operator/OperatorSidebar'
import { Outlet } from 'react-router'

const OperatorLayout = () => {
    return (
        <div className="flex min-h-screen overflow-hidden">
            <OperatorSidebar />

            <main className="flex-1 overflow-y-auto px-4">
                <Outlet />
            </main>
        </div>
    )
}

export default OperatorLayout