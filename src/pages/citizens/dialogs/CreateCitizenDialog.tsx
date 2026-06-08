import { Button } from '@/components/ui/Button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/Dialog'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'
import type { CitizenFormState } from '@/pages/citizens/types/CitizenFormState'
import { useState } from 'react'

export interface CreateCitizenDialogProps {
    open?: boolean
    onOpenChange: (flag: boolean) => void
    handleCreate: (formState: CitizenFormState) => Promise<void>
}

const CreateCitizenDialog = ({
    open,
    onOpenChange,
    handleCreate,
}: CreateCitizenDialogProps) => {
    const [createState, setCreateState] = useState<CitizenFormState>({
        fullName: '',
        phoneNumber: '',
        email: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCreateState(prevState => ({
            ...prevState,
            [name]: value
        }));

        console.log(e.target.name, e.target.value)
    };

    const resetState = () => {
        setCreateState({
            fullName: '',
            phoneNumber: '',
            email: ''
        })
    }

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
                        void handleCreate(createState)
                        resetState()
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>
                            Создание гражданина
                        </DialogTitle>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="full-name-edit">Имя</FieldLabel>
                            <Input
                                id="full-name-edit"
                                name="fullName"
                                onChange={(e) =>
                                    handleInputChange(e)
                                }
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="phone-number-edit">Телефон</FieldLabel>
                            <Input
                                id="phone-number-edit"
                                name="phoneNumber"
                                onChange={(e) =>
                                    handleInputChange(e)
                                }
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email-edit">Электронная почта</FieldLabel>
                            <Input
                                id="email-edit"
                                name="email"
                                onChange={(e) =>
                                    handleInputChange(e)
                                }
                                required
                            />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Отмена</Button>
                        </DialogClose>
                        <Button type="submit">Создать</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateCitizenDialog