import { LoadAccountByToken } from '@/domain/usecases'
import { Decrypter } from '../protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
    constructor(private readonly decrypter: Decrypter) { }
    async handle(data: LoadAccountByToken.Request): Promise<any> {
        try {
            const token = await this.decrypter.decrypt(data.accessToken)
            if (!token) return token
        } catch (error) {
            return null
        }
    }
}
