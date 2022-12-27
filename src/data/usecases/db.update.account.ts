import { UpdateAccount } from '@/domain/usecases'
import { CheckAccountByIdRepository } from '@/data/protocols/db'

export class DbUpdateAccount implements UpdateAccount {
    constructor(
        private readonly checkAccountByIdRepository: CheckAccountByIdRepository
    ) { }

    async handle(data: UpdateAccount.Request): Promise<any> {
        await this.checkAccountByIdRepository.checkAccountById(data.identification)
    }
}
