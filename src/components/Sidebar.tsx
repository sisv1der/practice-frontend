import type { ReactNode } from 'react'

import { Card, CardContent, CardFooter } from '@/components/ui/Card'
import { Separator } from '@/components/ui/Separator'

export interface SidebarProps {
    pageTitle?: string
    children?: ReactNode
    footer?: ReactNode
}

const Sidebar = ({pageTitle, children, footer}: SidebarProps) => {
    return (
        <Card className="rounded-none h-screen">
            <CardContent className="p-0 mt-2">
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="px-4 text-xl text-gray-950 font-bold">
                            Служба обработки обращений граждан
                        </h1>
                        {
                            pageTitle &&
                            <h2 className="px-4 text-xl text-gray-900 font-semibold">
                                {pageTitle}
                            </h2>
                        }
                        <Separator/>
                    </div>
                    {children}
                </div>
            </CardContent>
            <CardFooter className="mt-auto flex-row justify-center gap-4">
                {footer}
            </CardFooter>
        </Card>
    )
}

export default Sidebar