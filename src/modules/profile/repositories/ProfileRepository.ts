import { injectable, inject } from 'tsyringe'
import { Api } from '@/@core/services/api'

import { BaseRepository } from '@/@templates/repositories/BaseRepository'
import { IUser } from '../interfaces/user'

@injectable()
export class ProfileRepository extends BaseRepository<IUser> {
  constructor(@inject('ApiService') api: Api) {
    super(api, 'profile/')
  }
}
