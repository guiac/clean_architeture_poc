import { AddAccount } from '@/domain/usecases'
import { Hasher } from '@/data/protocols/cryptography'
import { AddAccountRepository, AuthenticationRepository } from '@/data/protocols/db'

export class DbAddAccount implements AddAccount {
    constructor(
        private readonly hasher: Hasher
        // private readonly signUpRepository: AddAccountRepository,
        // private readonly authenticationRepository: AuthenticationRepository
    ) {}

    async handle(data: AddAccount.Request): Promise<AddAccount.Result> {
        await this.hasher.hash(data.password)
        return true
    }
}
