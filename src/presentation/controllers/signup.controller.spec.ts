import { Validation } from '../protocols/validation'
import { SignupController } from './signup.controller'

const mockRequest = (): any => ({
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
class ValidationSpy implements Validation {
    error: Error = null
    input: any
    validate(input: any): Error {
        this.input = input
        return this.error
    }
}

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
