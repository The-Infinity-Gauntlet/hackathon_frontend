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
    transaction_amount?: number
    first_name?: number
    last_name?: number
    payer?: {
        email?: string
        identification?: {
            number?: string
            type?: string
        }
    }
    pix_url?: string
    point_of_interaction: {
        transaction_data: {
            qr_code: string
            qr_base_64: string
        }
    }
}
