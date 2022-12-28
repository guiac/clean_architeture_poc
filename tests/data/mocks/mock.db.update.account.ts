import { CheckAccountByIdRepository, UpdateAccountRepository } from '@/data/protocols/db'

export class CheckAccountByIdRepositorySpy implements CheckAccountByIdRepository {
    params: any
    result: any = false
    async checkAccountById(email: string): Promise<CheckAccountByIdRepository.Result> {
        this.params = email
        return this.result
    }
}

export class UpdateAccountRepositorySpy implements UpdateAccountRepository {
    params: any
    result: any = false
    async update(data: UpdateAccountRepository.Params): Promise<UpdateAccountRepository.Result> {
        this.params = data
        return this.result
    }
}
