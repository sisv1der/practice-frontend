import { Button } from '@/components/ui/Button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/Dialog'

export interface ActivateUserDialogProps {
    open: boolean
    onOpenChange: (flag: boolean) => void
    handleUserActivate: () => Promise<void>
}

const ActivateUserDialog = ({
    open,
    onOpenChange,
    handleUserActivate
}: ActivateUserDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger/>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>
                        Подтверждение
                    </DialogTitle>
                    <DialogDescription>
                        Вы уверены, что вы хотите активировать этого пользователя?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Отмена</Button>
                    </DialogClose>
                    <Button
                        onClick={() => void handleUserActivate()}
                    >
                        Активировать
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ActivateUserDialog