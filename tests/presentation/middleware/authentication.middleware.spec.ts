import { AuthenticationMiddleware } from '@/presentation/middlewares'
import { LoadAccountByTokenRepositorySpy } from '../mocks'

type SutTypes = {
    loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
    sut: AuthenticationMiddleware
}

const makeSut = (): SutTypes => {
    const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
    const role = 'any_role'
    const sut = new AuthenticationMiddleware(loadAccountByTokenRepositorySpy, role)
    return {
        loadAccountByTokenRepositorySpy,
        sut
    }
}
describe('Authentication Middleware', () => {
    test('Should call LoadAccountByTokenRepositorySpy with correct values', async () => {
        const { sut, loadAccountByTokenRepositorySpy } = makeSut()
        await sut.handle({ accessToken: 'any_accessToken' })
        expect(loadAccountByTokenRepositorySpy.params.accessToken).toBe('any_accessToken')
        expect(loadAccountByTokenRepositorySpy.params.role).toBe('any_role')
    })
})
