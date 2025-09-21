export interface IFlood {
    id: string
    descricao?: string
    createdAt?: string
    updatedAt?: string
    deletedAt?: string
}

export interface IFloodControllerState {
    floods: IFlood[]
    currentFlood: Partial<IFlood>
    pagination: {
        page: number
        pageSize: number
        offset: number
        limit: number
    }
    loading: boolean
    search: string
}
