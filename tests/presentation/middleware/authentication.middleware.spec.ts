import { AuthenticationMiddleware } from '@/presentation/middlewares'
import { LoadAccountByTokenRepositorySpy } from '../mocks'

type SutTypes = {
    loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
    sut: AuthenticationMiddleware
}

const mockRequest = (): AuthenticationMiddleware.Request => ({
    accessToken: 'any_accessToken'
})

const throwError = (): never => {
    throw new Error()
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
        await sut.handle(mockRequest())
        expect(loadAccountByTokenRepositorySpy.params.accessToken).toBe('any_accessToken')
        expect(loadAccountByTokenRepositorySpy.params.role).toBe('any_role')
    })

    test('Should return 403 if no x-access-token exists in headers', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle({})
        expect(httpResponse.statusCode).toBe(403)
    })

    test('Should return 403 if LoadAccountByTokenRepository return null', async () => {
        const { sut, loadAccountByTokenRepositorySpy } = makeSut()
        loadAccountByTokenRepositorySpy.result = null
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse.statusCode).toBe(403)
    })

    test('Should return 200 if LoadAccountByTokenRepository return valid account', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse.statusCode).toBe(200)
    })

    test('Should return 500 if LoadAccountByTokenRepository throws', async () => {
        const { sut, loadAccountByTokenRepositorySpy } = makeSut()
        jest.spyOn(loadAccountByTokenRepositorySpy, 'load').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse.statusCode).toBe(500)
    })
})
