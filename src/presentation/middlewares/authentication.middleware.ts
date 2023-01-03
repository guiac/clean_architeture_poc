import { LoadAccountByTokenRepository } from '@/data/protocols'
import { Middleware } from '../protocols'

export class AuthenticationMiddleware implements Middleware {
    constructor(private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository) { }
    async handle(httpRequest: any): Promise<any> {
        const { accessToken } = httpRequest
        await this.loadAccountByTokenRepository.loadAccountByToken(accessToken)
    }
}
