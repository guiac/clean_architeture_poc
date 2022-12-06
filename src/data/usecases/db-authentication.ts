import { Authentication } from '@/domain/usecases'
import { LoadAccountByEmailRepository } from '@/data/protocols/db'
import { HashComparer } from '@/data/protocols/cryptography'

export class DbAuthentication implements Authentication {
    constructor(
        private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
        private readonly hashComparer: HashComparer
    ) { }

    async handle(data: Authentication.Request): Promise<any> {
        const account = await this.loadAccountByEmailRepository.loadAccountByEmail(data.email)
        if (account) {
            await this.hashComparer.compare(account.password)
        }
        return null
    }
}
