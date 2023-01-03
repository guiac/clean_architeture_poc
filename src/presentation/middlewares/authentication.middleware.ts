import { LoadAccountByTokenRepository } from '@/data/protocols'
import { AccessDeniedError } from '../errors'
import { forbidden, ok, serverError } from '../helpers'
import { Middleware } from '../protocols'

export class AuthenticationMiddleware implements Middleware {
    constructor(
        private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
        private readonly role?: string
    ) { }

    async handle(httpRequest: AuthenticationMiddleware.Request): Promise<any> {
        try {
            const { accessToken } = httpRequest
            if (accessToken) {
                const account = await this.loadAccountByTokenRepository.load(accessToken, this.role)
                if (account) return ok({ accountId: account.identification })
            }
            return forbidden(new AccessDeniedError())
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace AuthenticationMiddleware {
    export type Request = {
        accessToken?: string
    }
    export type Result = boolean
}
