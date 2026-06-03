import {
    Dialog,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogFooter
} from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'

export interface DeactivateUserDialogProps {
    open: boolean
    onOpenChange: (flag: boolean) => void
    handleUserDeactivate: () => Promise<void>
}

const DeactivateUserDialog = ({
    open,
    onOpenChange,
    handleUserDeactivate
}: DeactivateUserDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger/>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>
                        Подтверждение
                    </DialogTitle>
                    <DialogDescription>
                        Вы уверены, что вы хотите деактивировать этого пользователя?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Отмена</Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={() => void handleUserDeactivate()}
                    >
                        Деактивировать
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeactivateUserDialog