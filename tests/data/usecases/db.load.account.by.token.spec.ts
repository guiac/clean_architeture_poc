import { DbLoadAccountByToken } from '@/data/usecases'
import { LoadAccountByToken } from '@/domain/usecases'
import { DecrypterSpy } from '../mocks'

type SutTypes = {
    decrypterSpy: DecrypterSpy
    sut: DbLoadAccountByToken
}

const makeSut = (): SutTypes => {
    const decrypterSpy = new DecrypterSpy()
    const sut = new DbLoadAccountByToken(decrypterSpy)
    return { sut, decrypterSpy }
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
})
