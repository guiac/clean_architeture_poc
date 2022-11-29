import { SignupController } from '@/presentation/controllers'
import { ValidationSpy, SignUpSpy } from '../mocks'

const mockRequest = (): SignupController.Request => ({
    email: 'email',
    password: 'password',
    name: 'name',
    lastName: 'lastName',
    birthDate: new Date(),
    tellphone: 'tellphone',
    cellphone: 'cellphone',
    streetAddress: 'streetAddress',
    numberAddress: 'numberAddress',
    districtAddress: 'districtAddress',
    cityAddress: 'cityAddress',
    stateAddress: 'stateAddress'
})

type SutTypes = {
    sut: SignupController
    validationSpy: ValidationSpy
    signUpSpy: SignUpSpy
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const signUpSpy = new SignUpSpy()
    const sut = new SignupController(validationSpy, signUpSpy)
    return {
        validationSpy,
        signUpSpy,
        sut
    }
}

describe('SignupController', () => {
    test('Should call validation with correct values', () => {
        const { sut, validationSpy } = makeSut()
        const request = mockRequest()
        sut.handle(request)
        expect(validationSpy.input).toEqual(request)
    })
    test('Should return 400 if Validation fails', async () => {
        const { sut, validationSpy } = makeSut()
        validationSpy.error = new Error()
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('Should call SignUp with correct values', async () => {
        const { sut, signUpSpy } = makeSut()
        const request = mockRequest()
        sut.handle(request)
        expect(signUpSpy.input).toEqual(request)
    })
})
