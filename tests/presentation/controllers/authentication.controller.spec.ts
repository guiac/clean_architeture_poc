import { AuthenticationController } from '@/presentation/controllers'
import { ValidationSpy } from '../mocks'

const mockRequest = (): AuthenticationController.Request => ({
    email: 'email',
    password: 'password'
})

type SutTypes = {
    validationSpy: ValidationSpy
    sut: AuthenticationController
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const sut = new AuthenticationController(validationSpy)
    return {
        validationSpy,
        sut
    }
}

describe('AuthenticationController', () => {
    test('Should call validation with correct values', async () => {
        const { sut, validationSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(validationSpy.input).toEqual(request)
    })
})
