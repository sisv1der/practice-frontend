import { Button } from '@/components/ui/Button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'
import PasswordConfirmationDialog from '@/pages/admin/dialogs/PasswordConfirmationDialog'
import { useState } from 'react'

export interface ChangePasswordDialogProps {
    open: boolean
    onOpenChange: (flag: boolean) => void
    handlePasswordChange: (password: string) => Promise<void>
}

const ChangePasswordDialog = ({
                                  open,
                                  onOpenChange,
                                  handlePasswordChange
                              }: ChangePasswordDialogProps) => {
    const [ openConfirmationDialog, setOpenConfirmationDialog ] = useState(false)
    const [ password, setPassword ] = useState('')

    const [ errors, setErrors ] = useState({
        confirmPassword: ''
    })

    return (
        <section>
            <Dialog
                open={open}
                onOpenChange={onOpenChange}
            >
                <form
                    onSubmit={() => setOpenConfirmationDialog(true)}
                >
                    <DialogTrigger/>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Изменение пароля
                            </DialogTitle>
                        </DialogHeader>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="password">Новый пароль</FieldLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required/>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">Подтверждение пароля</FieldLabel>
                                <Input
                                    className={errors.confirmPassword ? 'border-red-500' : ''}
                                    name="password"
                                    type="password"
                                    onChange={(e) =>
                                        setErrors(prev => ({
                                                ...prev,
                                                confirmPassword: e.target.value !== password
                                                    ? 'Пароли не совпадают'
                                                    : ''
                                            })
                                        )
                                    }
                                    required/>
                            </Field>
                            <Field>
                                <Button type="submit">Изменить пароль</Button>
                            </Field>
                        </FieldGroup>
                    </DialogContent>
                </form>
            </Dialog>

            <PasswordConfirmationDialog
                open={openConfirmationDialog}

                onOpenChange={setOpenConfirmationDialog}

                handlePasswordChange={handlePasswordChange}

                password={password}
            />
        </section>
    )
}

export default ChangePasswordDialog