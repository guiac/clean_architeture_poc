import { AuthenticationMiddleware } from '@/presentation/middlewares'
import { LoadAccountByTokenRepositorySpy } from '../mocks'

type SutTypes = {
    loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
    sut: AuthenticationMiddleware
}

const makeSut = (): SutTypes => {
    const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
    const sut = new AuthenticationMiddleware(loadAccountByTokenRepositorySpy)
    return {
        loadAccountByTokenRepositorySpy,
        sut
    }
}
describe('Authentication Middleware', () => {
    test('Should call LoadAccountByTokenRepositorySpy with correct values', async () => {
        const { sut, loadAccountByTokenRepositorySpy } = makeSut()
        await sut.handle({ accessToken: 'any_accessToken' })
        expect(loadAccountByTokenRepositorySpy.params).toBe('any_accessToken')
    })
})
