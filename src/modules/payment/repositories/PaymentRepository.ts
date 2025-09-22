import { injectable, inject } from 'tsyringe'
import { Api } from '@/@core/services/api'

import { BaseRepository } from '@/@templates/repositories/BaseRepository'
import { IPayment, IPaymentPix } from '../interfaces/payment'

@injectable()
export class PaymentPixRepository extends BaseRepository<IPaymentPix> {
    constructor(@inject('ApiService') api: Api) {
        super(api, 'payment/pix/')
    }
}
