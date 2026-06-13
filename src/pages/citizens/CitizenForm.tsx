import { deleteCitizen, updateCitizen } from '@/api/citizen'
import { Button } from '@/components/ui/Button'
import { FieldGroup, FieldLabel, Field } from '@/components/ui/Field'
import DeleteCitizenDialog from '@/pages/citizens/dialogs/DeleteCitizenDialog'
import { useCitizen } from '@/pages/citizens/hooks/useCitizen'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Input } from '@/components/ui/input'
import type { CitizenFormState } from '@/pages/citizens/types/CitizenFormState'

export interface CitizenFormProps {
    readonly?: boolean
}

const CitizenForm = ({readonly = true}: CitizenFormProps) => {
    const navigate = useNavigate()

    const [ open, setOpen ] = useState(false)

    const {id} = useParams()
    const citizen = useCitizen(id)
    const [ state, setState ] = useState<CitizenFormState>({
        fullName: '',
        phoneNumber: '',
        email: ''
    })

    useEffect(() => {
        if (!citizen) return

        setState({
            fullName: citizen.fullName,
            phoneNumber: citizen.phoneNumber,
            email: citizen.email
        })
    }, [ citizen ])

    const goBack = () => {
        void navigate(-1)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (
        e: React.SubmitEvent<HTMLFormElement>
    ) => {
        e.preventDefault()
        await updateCitizen(id, {
            fullName: state.fullName,
            phoneNumber: state.phoneNumber,
            email: state.email
        })
        goBack()
    }

    const handleDelete = async () => {
        await deleteCitizen(id)
        goBack()
    }

    return (
        <div className="overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                    Гражданин
                </h2>

                <Button
                    type="button"
                    onClick={() => void navigate(`appeals`)}
                >
                    Обращения
                </Button>
            </div>
            <div className="min-h-[calc(100vh-3rem)] flex items-center justify-center">
                <form
                    className="flex flex-col w-full max-w-md mx-auto justify-center gap-4"
                    onSubmit={(event) => {
                        void handleSubmit(event)
                    }}
                >
                    <FieldGroup className="w-full">
                        <Field>
                            <FieldLabel htmlFor="full-name">
                                Имя
                            </FieldLabel>
                            <Input
                                id="full-name"
                                name="fullName"
                                value={state.fullName}
                                onChange={(e) => {
                                    handleInputChange(e)
                                }}
                                disabled={readonly}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="phone-number">
                                Телефон
                            </FieldLabel>
                            <Input
                                id="phone-number"
                                name="phoneNumber"
                                value={state.phoneNumber}
                                onChange={(e) => {
                                    handleInputChange(e)
                                }}
                                disabled={readonly}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">
                                Электронная почта
                            </FieldLabel>
                            <Input
                                id="email"
                                name="email"
                                value={state.email}
                                onChange={(e) => {
                                    handleInputChange(e)
                                }}
                                disabled={readonly}
                            />
                        </Field>
                    </FieldGroup>
                    <div className="flex flex-col gap-3 items-center w-full">
                        <div>
                            {readonly ? (
                                <div className="flex gap-12 justify-center w-full">
                                    <Button
                                        type="button"
                                        onClick={() => void navigate('edit')}
                                        className="w-fit min-w-28"
                                    >
                                        Изменить
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => setOpen(true)}
                                        variant="destructive"
                                        className="w-fit min-w-28"
                                    >
                                        Удалить
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    type="submit"
                                    className="w-fit min-w-28"
                                >
                                    Сохранить
                                </Button>
                            )}
                        </div>
                        <Button
                            type="button"
                            onClick={() => goBack()}
                            className="w-fit min-w-28"
                        >
                            Назад
                        </Button>
                    </div>
                </form>
            </div>
            <DeleteCitizenDialog open={open} onOpenChange={setOpen} handleCitizenDelete={handleDelete}/>
        </div>
    )
}

export default CitizenForm