import { createAppeal, updateAppeal } from '@/api/appeal'
import { createAppealComment } from '@/api/appeal-comment'
import { Button } from '@/components/ui/Button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import CommentCard from '@/pages/appeals/CommentCard'
import CitizenSelectDialog from '@/pages/appeals/dialogs/CitizenSelectDialog'
import CreateCommentDialog from '@/pages/appeals/dialogs/CreateCommentDialog'
import { useAppealComments } from '@/pages/appeals/hooks/useAppealComments'
import { useCitizen } from '@/pages/citizens/hooks/useCitizen'
import { useAuth } from '@/routing/auth-context'
import type { AppealCategory, AppealStatus } from '@/types/Appeal'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

export type AppealFormMode = 'create' | 'edit' | 'view'

const MODE_CONFIG = {
    create: {
        readOnly: false,
        canEditStatus: false,
        canEditCitizen: true,
        title: 'Создание обращения'
    },
    edit: {
        readOnly: false,
        canEditStatus: true,
        canEditCitizen: false,
        title: 'Редактирование обращения'
    },
    view: {
        readOnly: true,
        canEditStatus: false,
        canEditCitizen: false,
        title: 'Просмотр обращения'
    }
} as const

export type AppealFormState = {
    id?: string
    title?: string
    description?: string
    status?: AppealStatus
    category?: AppealCategory
    citizenId?: string
}

export interface AppealFormProps {
    mode: AppealFormMode
    context: AppealFormState
}

const AppealForm = ({mode, context}: AppealFormProps) => {
    const navigate = useNavigate()

    const [ formState, setFormState ] = useState<AppealFormState>(context)

    useEffect(() => {
        setFormState(context)
    }, [ context ])

    const [ openCitizenSelectDialog, setOpenCitizenSelectDialog ] = useState<boolean>(false)
    const [ openCreateCommentDialog, setOpenCreateCommentDialog ] = useState<boolean>(false)

    const {user} = useAuth()

    const isEmployee = user?.role === 'EMPLOYEE'

    const config = MODE_CONFIG[mode]

    const citizen = useCitizen(formState.citizenId)
    const {appealComments: comments, refetch: refetchComments} = useAppealComments(context.id)

    const goBack = () => {
        void navigate(-1)
    }

    const handleSaveComment = async (text: string) => {
        await createAppealComment(context.id, text)
        await refetchComments()
    }

    const handleSaveAppeal = async () => {
        const description = formState.description.trim() || undefined

        await createAppeal({
            title: formState.title,
            description: description,
            category: formState.category,
            citizenId: formState.citizenId
        })
    }

    const handleUpdateAppeal = async () => {
        const description = formState.description.trim() || undefined

        await updateAppeal(formState.id, {
            title: formState.title,
            description: description,
            status: formState.status,
            category: formState.category,
            citizenId: formState.citizenId
        })
    }

    const handleSubmit = async () => {
        if (mode === 'create') {
            await handleSaveAppeal()
        } else if (mode === 'edit') {
            await handleUpdateAppeal()
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleCategoryChange = (value: AppealCategory) => {
        setFormState(prev => ({
            ...prev,
            category: value
        }))
    }

    const handleStatusChange = (value: AppealStatus) => {
        setFormState(prev => ({
            ...prev,
            status: value
        }))
    }

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault()

                    void handleSubmit()
                        .then(goBack)
                        .catch(console.error)
                }}
            >
                <h2 className="text-xl font-semibold">
                    {config.title}
                </h2>
                <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel htmlFor="title">Заголовок</FieldLabel>
                        <Input
                            id="title"
                            name="title"
                            onChange={(e) =>
                                handleInputChange(e)
                            }
                            value={formState.title}
                            disabled={config.readOnly}
                            required
                        />
                    </Field>
                    <Field className="md:col-span-2">
                        <FieldLabel htmlFor="">Описание</FieldLabel>
                        <Input
                            id="description"
                            name="description"
                            onChange={(e) =>
                                handleInputChange(e)
                            }
                            value={formState.description}
                            disabled={config.readOnly}
                        />
                    </Field>
                    <Field className="w-52">
                        <FieldLabel htmlFor="status">Статус</FieldLabel>
                        <Select
                            name="status"
                            onValueChange={(value) => {
                                handleStatusChange(value as AppealStatus)
                            }}
                            disabled={!config.canEditStatus}
                            value={formState.status}
                            required
                        >
                            <SelectTrigger id="status">
                                <SelectValue placeholder="Статус"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="NEW">
                                    Новый
                                </SelectItem>
                                <SelectItem value="IN_PROGRESS">
                                    В обработке
                                </SelectItem>
                                <SelectItem value="DONE">
                                    Завершено
                                </SelectItem>
                                <SelectItem value="REJECTED">
                                    Отклонено
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                    <Field className="w-52">
                        <FieldLabel htmlFor="category">Категория</FieldLabel>
                        <Select
                            name="category"
                            onValueChange={(value) => {
                                handleCategoryChange(value)
                            }}
                            disabled={config.readOnly}
                            value={formState.category}
                            required
                        >
                            <SelectTrigger id="category">
                                <SelectValue placeholder="Категория"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ROADS">
                                    Дороги
                                </SelectItem>
                                <SelectItem value="COMMUNAL_SERVICES">
                                    Коммунальные услуги
                                </SelectItem>
                                <SelectItem value="LIGHTING">
                                    Освещение
                                </SelectItem>
                                <SelectItem value="TRASH">
                                    Мусор
                                </SelectItem>
                                <SelectItem value="IMPROVEMENT">
                                    Предложения по благоустройству
                                </SelectItem>
                                <SelectItem value="OTHER">
                                    Другое
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                    <Field className="md:col-span-2">
                        <FieldLabel htmlFor="citizen">Гражданин</FieldLabel>

                        <div className="flex gap-3 items-center">
                            <Label>
                                {citizen?.fullName || 'Не выбран'}
                            </Label>
                            <Button
                                type="button"

                                onClick={() => setOpenCitizenSelectDialog(true)}

                                disabled={!config.canEditCitizen}
                            >
                                Выбрать
                            </Button>
                        </div>
                    </Field>
                </FieldGroup>
                <div className="flex gap-3 justify-center mt-6">
                    {!isEmployee &&
                        <div>
                            {config.readOnly ? (
                                <Button
                                    type="button"
                                    onClick={() => void navigate('edit')}
                                    className="w-fit min-w-28"
                                >
                                    Изменить
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="w-fit min-w-28"
                                >
                                    Сохранить
                                </Button>
                            )}
                        </div>}
                    <Button
                        type="button"
                        onClick={() => goBack()}
                        className="w-fit min-w-28"
                    >
                        Назад
                    </Button>
                </div>
            </form>

            <section className="mt-8">
                <
                    div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                        Комментарии
                    </h3>

                    {isEmployee && (
                        <Button
                            type="button"
                            onClick={() => setOpenCreateCommentDialog(true)}
                            className="w-fit"
                        >
                            Добавить комментарий
                        </Button>
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    {comments.map(comment => (
                        <CommentCard
                            key={comment.id}
                            comment={comment}
                        />
                    ))}
                </div>
            </section>

            <CitizenSelectDialog
                open={openCitizenSelectDialog}

                onOpenChange={setOpenCitizenSelectDialog}

                handleSelect={(citizen) =>
                    setFormState(prev => ({
                        ...prev,
                        citizenId: citizen.id
                    }))
                }
            />

            <CreateCommentDialog
                open={openCreateCommentDialog}

                onOpenChange={setOpenCreateCommentDialog}

                onCreate={handleSaveComment}
            />
        </div>
    )
}

export default AppealForm