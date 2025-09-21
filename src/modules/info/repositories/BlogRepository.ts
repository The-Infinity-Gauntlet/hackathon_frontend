import { injectable, inject } from 'tsyringe'
import { Api } from '@/@core/services/api'

import { BaseRepository } from '@/@templates/repositories/BaseRepository'
import { IBlog } from '../interfaces/blog'

@injectable()
export class BlogRepository extends BaseRepository<IBlog> {
    constructor(@inject('ApiService') api: Api) {
        super(api, 'blog/')
    }
}
