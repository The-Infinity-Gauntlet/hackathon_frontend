export interface IPayment {
    id: string
    descricao?: string
    createdAt?: string
    updatedAt?: string
    deletedAt?: string
}

export interface IPaymentPix {
    id: string
    total?: number
    payment_method_id?: string
    description?: string
    amount?: number
    first_name?: number
    last_name?: number
    email?: string
    identification_number?: string
    identification_type?: string
    pix_url?: string
    point_of_interaction: {
        transaction_data: {
            qr_code: string
            qr_base_64: string
        }
    }
}
