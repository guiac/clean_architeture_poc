import { AddAccount } from '@/domain/usecases'
import { Hasher } from '@/data/protocols/cryptography'
import { AddAccountRepository, CheckAccountByEmailRepository } from '@/data/protocols/db'

export class DbAddAccount implements AddAccount {
    constructor(
        private readonly hasher: Hasher,
        private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
        private readonly addAccountRepository: AddAccountRepository
    ) { }

    async handle(data: AddAccount.Request): Promise<any> {
        const account = await this.checkAccountByEmailRepository.checkAccountByEmail(data.email)
        if (!account) {
            const hashedPassword = await this.hasher.hash(data.password)
            const account = await this.addAccountRepository.save({ ...data, password: hashedPassword })
            return account
        }
        return true
    }
}
