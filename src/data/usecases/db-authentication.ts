import { Authentication } from '@/domain/usecases'
import { LoadAccountByEmailRepository } from '@/data/protocols/db'
import { HashComparer, Encrypter } from '@/data/protocols/cryptography'

export class DbAuthentication implements Authentication {
    constructor(
        private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
        private readonly hashComparer: HashComparer,
        private readonly encrypter: Encrypter
    ) { }

    async handle(data: Authentication.Request): Promise<any> {
        const account = await this.loadAccountByEmailRepository.loadAccountByEmail(data.email)
        if (account) {
            const isValid = await this.hashComparer.compare(data.password, account.password)
            if (isValid) {
                await this.encrypter.encrypt(account.id)
            }
        }
        return null
    }
}
