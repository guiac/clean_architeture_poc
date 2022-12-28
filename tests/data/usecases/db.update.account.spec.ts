import { UpdateAccount } from '@/domain/usecases'
import { DbUpdateAccount } from '@/data/usecases'
import { CheckAccountByIdRepositorySpy } from '@/tests/data/mocks'

const throwError = (): never => {
    throw new Error()
}

const mockeRequest = (): UpdateAccount.Request => ({
    identification: 'any_id',
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
    sut: DbUpdateAccount
    checkAccountByIdRepositorySpy: CheckAccountByIdRepositorySpy
}

const makeSut = (): SutTypes => {
    const checkAccountByIdRepositorySpy = new CheckAccountByIdRepositorySpy()
    const sut = new DbUpdateAccount(checkAccountByIdRepositorySpy)
    return {
        checkAccountByIdRepositorySpy,
        sut
    }
}

describe('DbUpdateAccount Usecase', () => {
    test('Should call CheckAccountByIdRepositorySpy with correct values', async () => {
        const { sut, checkAccountByIdRepositorySpy } = makeSut()
        await sut.handle(mockeRequest())
        expect(checkAccountByIdRepositorySpy.params).toBe(mockeRequest().identification)
    })

    test('Should throw if CheckAccountByIdRepository throwss', async () => {
        const { sut, checkAccountByIdRepositorySpy } = makeSut()
        jest.spyOn(checkAccountByIdRepositorySpy, 'checkAccountById').mockImplementationOnce(throwError)
        const promise = sut.handle(mockeRequest())
        await expect(promise).rejects.toThrow()
    })
})
