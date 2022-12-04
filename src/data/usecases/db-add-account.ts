import { AddAccount } from '@/domain/usecases'
import { Hasher } from '@/data/protocols/cryptography'
import { AddAccountRepository, AuthenticationRepository, CheckAccountByEmailRepository } from '@/data/protocols/db'

export class DbAddAccount implements AddAccount {
    constructor(
        private readonly hasher: Hasher,
        private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
        // private readonly AddAccountRepository: AddAccountRepository
        // private readonly authenticationRepository: AuthenticationRepository
    ) { }

    async handle(data: AddAccount.Request): Promise<any> {
        await this.checkAccountByEmailRepository.checkAccountByEmail(data.email)
        const hashedPassword = await this.hasher.hash(data.password)
        return hashedPassword
    }
}
