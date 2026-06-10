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

export interface DeleteCitizenProps {
    open: boolean
    onOpenChange: (flag: boolean) => void
    handleCitizenDelete: () => Promise<void>
}

const DeleteCitizenDialog = ({
    open,
    onOpenChange,
    handleCitizenDelete
}: DeleteCitizenProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger/>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>
                        Подтверждение
                    </DialogTitle>
                    <DialogDescription>
                        Вы уверены, что вы хотите удалить этого гражданина?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Отмена</Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={() => void handleCitizenDelete()}
                    >
                        Удалить
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteCitizenDialog