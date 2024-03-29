import { AuthenticationMiddleware } from '@/presentation/middlewares'
import { Middleware } from '@/presentation/protocols'
import { makeDbLoadAccountByToken } from '@/main/factories'

export const makeAuthMiddleware = (role?: string): Middleware => {
    return new AuthenticationMiddleware(makeDbLoadAccountByToken(), role)
}
