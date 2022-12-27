import { CheckAccountByIdRepository } from '@/data/protocols/db'

export class CheckAccountByIdRepositorySpy implements CheckAccountByIdRepository {
    params: any
    result: any = false
    async checkAccountById(email: string): Promise<CheckAccountByIdRepository.Result> {
        this.params = email
        return this.result
    }
}
