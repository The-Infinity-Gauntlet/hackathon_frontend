import { injectable, inject } from 'tsyringe'
import { Api } from '@/@core/services/api'

import { BaseRepository } from '@/@templates/repositories/BaseRepository'
import { IAuth } from '../interfaces/auth'

@injectable()
export class AuthRepository extends BaseRepository<IAuth> {
    constructor(@inject('ApiService') api: Api) {
        super(api, 'auth/')
    }
}
