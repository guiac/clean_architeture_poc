import { LoadAccountByToken } from '@/domain/usecases'
import { Decrypter } from '../protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
    constructor(private readonly decrypter: Decrypter) { }
    async handle(data: LoadAccountByToken.Request): Promise<any> {
        await this.decrypter.decrypt(data.accessToken)
    }
}
