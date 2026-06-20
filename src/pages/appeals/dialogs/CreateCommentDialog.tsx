import { Field, FieldGroup, FieldLabel } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'
import { useState } from 'react'
import {
    DialogTrigger,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose
} from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'

export interface CreateCommentDialogProps {
    open: boolean
    onOpenChange: (flag: boolean) => void
    onCreate: (text: string) => Promise<void>
}

const CreateCommentDialog = ({open, onOpenChange, onCreate}: CreateCommentDialogProps) => {
    const [ text, setText ] = useState<string>('')

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogTrigger/>
            <DialogContent>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        void onCreate(text)
                        onOpenChange(false)
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>
                            Комментарий
                        </DialogTitle>
                    </DialogHeader>

                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="text">Имя</FieldLabel>
                            <Input
                                id="text"
                                name="text"
                                onChange={(e) =>
                                    setText(e.target.value)
                                }
                                required
                            />
                        </Field>
                    </FieldGroup>

                    <DialogFooter>
                        <DialogClose>
                            <Button type="button" className="w-fit min-w-28">
                                Назад
                            </Button>
                        </DialogClose>
                        <Button type="submit" className="w-fit min-w-28">
                            Сохранить
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateCommentDialog