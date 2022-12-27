import { UpdateAccount } from '@/domain/usecases'

export class UpdateAccountSpy implements UpdateAccount {
    input: any
    async handle(input: UpdateAccount.Request): Promise<UpdateAccount.Result> {
        this.input = input
        return this.input
    }
}
