import { LoadAccountByTokenRepository } from '@/data/protocols'
import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers'
import { Middleware } from '../protocols'

export class AuthenticationMiddleware implements Middleware {
    constructor(
        private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
        private readonly role?: string
    ) { }

    async handle(httpRequest: AuthenticationMiddleware.Request): Promise<any> {
        const { accessToken } = httpRequest
        const account = await this.loadAccountByTokenRepository.load(accessToken, this.role)
        if (!account) return forbidden(new AccessDeniedError())
    }
}

export namespace AuthenticationMiddleware {
    export type Request = {
        accessToken: string
    }
    export type Result = boolean
}
