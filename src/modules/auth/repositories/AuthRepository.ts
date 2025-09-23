import { injectable, inject } from 'tsyringe'
import { Api } from '@/@core/services/api'

import { BaseRepository } from '@/@templates/repositories/BaseRepository'
import { IAuth } from '../interfaces/auth'

@injectable()
export class AuthRepository extends BaseRepository<IAuth> {
    constructor(@inject('ApiService') private apiRef: Api) {
        super(apiRef, '')
    }

    // POST /auth/ with { email, password }
    authenticate(payload: { email: string; password: string }) {
        return this.apiRef.post(`${this.basePath}/auth/token`, payload)
    }

    // POST /auth/register/ with register fields
    register(payload: {
        name: string
        email: string
        dateborn: string
        password: string
        'password-confirm': string
    }) {
        return this.apiRef.post(`${this.basePath}/users/register/`, payload)
    }
}
