import { SignupController } from '@/presentation/controllers'
import { ValidationSpy, SignUpSpy, AuthSpy } from '../mocks'
import { serverError } from '@/presentation/helpers/http-helper'

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

const throwError = (): never => {
    throw new Error()
}

type SutTypes = {
    sut: SignupController
    validationSpy: ValidationSpy
    signUpSpy: SignUpSpy
    authSpy: AuthSpy
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const signUpSpy = new SignUpSpy()
    const authSpy = new AuthSpy()
    const sut = new SignupController(validationSpy, signUpSpy, authSpy)
    return {
        validationSpy,
        signUpSpy,
        authSpy,
        sut
    }
}

describe('SignupController', () => {
    test('Should call validation with correct values', async () => {
        const { sut, validationSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
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
        await sut.handle(request)
        expect(signUpSpy.input).toEqual(request)
    })

    test('Should return 500 if SignUp throws', async () => {
        const { sut, signUpSpy } = makeSut()
        jest.spyOn(signUpSpy, 'handle').mockImplementationOnce(throwError)
        const request = mockRequest()
        const response = await sut.handle(request)
        expect(response).toEqual(serverError(new Error()))
    })

    test('Should call Authentication with correct values', async () => {
        const { sut, authSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(authSpy.input).toEqual({
            email: request.email,
            password: request.password
        })
    })
})
