import { AddAccountRepository, CheckAccountByEmailRepository, CheckAccountByIdRepository, UpdateAccountRepository } from '@/data/protocols'
import { LoadAccountByEmail, UpdateAccount } from '@/domain/usecases'
import { AccountModel } from './models'

export class AccountMongoRepository implements AddAccountRepository, UpdateAccountRepository, CheckAccountByIdRepository {
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

    async update(data: UpdateAccountRepository.Params): Promise<UpdateAccount.Result> {
        const { identification, ...update } = data
        const filter = { identification }
        const option = { new: true }
        return await AccountModel.findOneAndUpdate(filter, update, option)
    }

    async checkAccountById(identification: string): Promise<CheckAccountByIdRepository.Result> {
        const result = await AccountModel.findOne({ identification }).lean()
        return !!result
    }
}
