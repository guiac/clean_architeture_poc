import { UpdateAccountController } from '@/presentation/controllers'
import { ValidationSpy } from '../mocks'

const mockRequest = (): UpdateAccountController.Request => ({
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

type SutTypes = {
    sut: UpdateAccountController
    validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const sut = new UpdateAccountController(validationSpy)
    return {
        validationSpy,
        sut
    }
}

describe('UpdateAccountController', () => {
    test('Should call validation with correct values', async () => {
        const { sut, validationSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(validationSpy.input).toEqual(request)
    })
})
