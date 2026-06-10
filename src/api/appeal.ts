export interface AppealInfoResponse {
    id: string
    title: string
    description?: string
    status: 'NEW' | 'IN_PROGRESS' | 'DONE' | 'REJECTED'
    category: 'ROADS' | 'COMMUNAL_SERVICES' | 'LIGHTING' | 'TRASH' | 'IMPROVEMENT' | 'OTHER'
    citizenId: string
    createdById: string
    assignedToId?: string
    createdAt: string
    updatedAt: string
}

