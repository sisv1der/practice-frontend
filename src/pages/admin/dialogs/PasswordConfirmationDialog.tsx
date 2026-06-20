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

export interface PasswordConfirmationDialogProps {
    open: boolean
    onOpenChange: (flag: boolean) => void
    handlePasswordChange: (password: string) => Promise<void>
    password: string
}

const PasswordConfirmationDialog = ({
                                        open,
                                        onOpenChange,
                                        handlePasswordChange,
                                        password
                                    }: PasswordConfirmationDialogProps) => {
    return <Dialog
        open={open}
        onOpenChange={onOpenChange}
    >
        <DialogTrigger/>
        <DialogContent className="sm:max-w-sm">
            <DialogHeader>
                <DialogTitle>
                    Подтверждение
                </DialogTitle>
                <DialogDescription>
                    Вы уверены, что вы хотите изменить пароль?
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Отмена</Button>
                </DialogClose>
                <Button
                    onClick={() => void handlePasswordChange(password)}
                >
                    Ок
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}

export default PasswordConfirmationDialog