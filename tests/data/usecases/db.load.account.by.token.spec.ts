import { DbLoadAccountByToken } from '@/data/usecases'
import { LoadAccountByToken } from '@/domain/usecases'
import { LoadAccountByTokenRepositorySpy } from '@/tests/presentation/mocks'
import { DecrypterSpy } from '../mocks'

type SutTypes = {
    decrypterSpy: DecrypterSpy
    loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
    sut: DbLoadAccountByToken
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const decrypterSpy = new DecrypterSpy()
    const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
    const sut = new DbLoadAccountByToken(decrypterSpy, loadAccountByTokenRepositorySpy)
    return { sut, decrypterSpy, loadAccountByTokenRepositorySpy }
}

const mockRequest = (): LoadAccountByToken.Request => ({
    accessToken: 'any_token'
})

describe('DbLoadAccountByToken', () => {
    test('Should call Decrypter with correct ciphertext', async () => {
        const { sut, decrypterSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(decrypterSpy.param).toBe(request.accessToken)
    })
    test('Should return null if Decrypter returns null', async () => {
        const { sut, decrypterSpy } = makeSut()
        decrypterSpy.result = null
        const request = mockRequest()
        const response = await sut.handle(request)
        expect(response).toBeNull()
    })
    test('Should return null if Decrypter throws', async () => {
        const { sut, decrypterSpy } = makeSut()
        decrypterSpy.result = null
        jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError)
        const request = mockRequest()
        const response = await sut.handle(request)
        expect(response).toBeNull()
    })

    test('Should call LoadAccountByTokenRepository with correct values', async () => {
        const { sut, loadAccountByTokenRepositorySpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(loadAccountByTokenRepositorySpy.params).toEqual(request)
    })

    test('Should return null if LoadAccountByTokenRepository return null', async () => {
        const { sut, loadAccountByTokenRepositorySpy } = makeSut()
        loadAccountByTokenRepositorySpy.result = null
        const request = mockRequest()
        const response = await sut.handle(request)
        expect(response).toBeNull()
    })
})
