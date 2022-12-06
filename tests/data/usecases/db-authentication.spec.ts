import { AddAccount } from '@/domain/usecases'
import { DbAuthentication } from '@/data/usecases'
import { LoadAccountByEmailRepositorySpy } from '@/tests/data/mocks'

const throwError = (): never => {
    throw new Error()
}

const mockeRequest = (): AddAccount.Request => ({
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
    sut: DbAuthentication
    loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
    const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
    const sut = new DbAuthentication(loadAccountByEmailRepositorySpy)
    return {
        loadAccountByEmailRepositorySpy,
        sut
    }
}

describe('DbAuthentication Usecase', () => {
    test('Should call loadAccountByEmailRepositorySpy with correct value', async () => {
        const { sut, loadAccountByEmailRepositorySpy } = makeSut()
        await sut.handle(mockeRequest())
        expect(loadAccountByEmailRepositorySpy.params).toBe(mockeRequest().email)
    })
    test('Should throw if LoadAccountByEmailRepositorySpy throws', async () => {
        const { sut, loadAccountByEmailRepositorySpy } = makeSut()
        jest.spyOn(loadAccountByEmailRepositorySpy, 'loadAccountByEmail').mockImplementationOnce(throwError)
        const promise = sut.handle(mockeRequest())
        await expect(promise).rejects.toThrow()
    })
})
