import { SignupController } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers/http-helper'
import { ValidationSpy } from '../mocks/mock.validation'

const mockRequest = (): any => ({
    email: 'email',
    password: 'password',
    name: 'name',
    lastName: 'lastName',
    birthDate: 'birthDate',
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
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const sut = new SignupController(validationSpy)
    return {
        validationSpy,
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
})
