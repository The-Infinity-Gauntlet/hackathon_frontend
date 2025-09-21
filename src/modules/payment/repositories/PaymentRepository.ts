import { injectable, inject } from 'tsyringe'
import { Api } from '@/@core/services/api'

import { BaseRepository } from '@/@templates/repositories/BaseRepository'
import { IPayment } from '../interfaces/payment'

@injectable()
export class PaymentRepository extends BaseRepository<IPayment> {
    constructor(@inject('ApiService') api: Api) {
        super(api, 'payment/')
    }
}
