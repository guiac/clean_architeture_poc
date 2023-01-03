import { LoadAccountByTokenRepository } from '@/data/protocols'
import { Middleware } from '../protocols'

export class AuthenticationMiddleware implements Middleware {
    constructor(
        private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
        private readonly role?: string
    ) { }

    async handle(httpRequest: any): Promise<any> {
        const { accessToken } = httpRequest
        await this.loadAccountByTokenRepository.load(accessToken, this.role)
    }
}
