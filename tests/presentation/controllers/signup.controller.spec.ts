import { SignUpController } from '@/presentation/controllers'
import { ValidationSpy, AddAccountSpy, AuthSpy } from '../mocks'
import { serverError, ok } from '@/presentation/helpers/http-helper'

const mockRequest = (): SignUpController.Request => ({
    email: 'email',
    password: 'password',
    identification: 'identification',
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
    sut: SignUpController
    validationSpy: ValidationSpy
    signUpSpy: AddAccountSpy
    authSpy: AuthSpy
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const signUpSpy = new AddAccountSpy()
    const authSpy = new AuthSpy()
    const sut = new SignUpController(validationSpy, signUpSpy, authSpy)
    return {
        validationSpy,
        signUpSpy,
        authSpy,
        sut
    }
}

describe('SignUpController', () => {
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

    test('Should return 500 if Authentication throws', async () => {
        const { sut, authSpy } = makeSut()
        jest.spyOn(authSpy, 'handle').mockImplementationOnce(throwError)
        const request = mockRequest()
        const response = await sut.handle(request)
        expect(response).toEqual(serverError(new Error()))
    })

    test('Should return 200 if SignUp and Authentication pass', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const { password, ...rest } = request
        const response = await sut.handle(request)
        expect(response).toEqual(ok({ ...rest, accessToken: 'accessToken' }))
    })
})