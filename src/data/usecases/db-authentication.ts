import { Authentication } from '@/domain/usecases'
import { LoadAccountByEmailRepository } from '@/data/protocols/db'

export class DbAuthentication implements Authentication {
    constructor(
        private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
    ) { }

    async handle(data: Authentication.Request): Promise<any> {
        await this.loadAccountByEmailRepository.loadAccountByEmail(data.email)
        return null
    }
}
