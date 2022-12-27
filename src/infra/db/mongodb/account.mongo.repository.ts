import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository } from '@/data/protocols'
import { LoadAccountByEmail } from '@/domain/usecases'
import { AccountModel } from './models'

export class AccountMongoRepository implements AddAccountRepository {
    async save(data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
        const model = new AccountModel(data)
        const result = await model.save()
        return result.identification !== null
    }

    async checkAccountByEmail(email: string): Promise<CheckAccountByEmailRepository.Result> {
        const result = await AccountModel.findOne({ email }).lean()
        return !!result
    }

    async loadAccountByEmail(email: string): Promise<LoadAccountByEmail.Result> {
        return await AccountModel.findOne({ email }).lean()
    }
}
