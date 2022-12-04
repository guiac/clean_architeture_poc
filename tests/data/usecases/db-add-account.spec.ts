
// salvar no banco
// verificar se o email é duplicado
//
import { AddAccount } from '@/domain/usecases'
import { DbAddAccount } from '@/data/usecases'
import { AddAccountRepositorySpy, AuthenticationRepositorySpy, HasherSpy } from '@/tests/data/mocks'

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
    sut: DbAddAccount
    hasherSpy: HasherSpy
    addAccountRepositorySpy: AddAccountRepositorySpy
    authenticationRepository: AuthenticationRepositorySpy
    // checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
    const hasherSpy = new HasherSpy()
    const addAccountRepositorySpy = new AddAccountRepositorySpy()
    const authenticationRepository = new AuthenticationRepositorySpy()
    const sut = new DbAddAccount(hasherSpy)
    return {
        hasherSpy,
        addAccountRepositorySpy,
        authenticationRepository,
        sut
    }
}

describe('DbAddAccount Usecase', () => {
    test('Should call Hasher with correct plaintext', async () => {
        const { sut, hasherSpy } = makeSut()
        await sut.handle(mockeRequest())
        expect(hasherSpy.plaintext).toBe(mockeRequest().password)
    })
    test('Should throw if Hasher throws', async () => {
        const { sut, hasherSpy } = makeSut()
        jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
        const promise = sut.handle(mockeRequest())
        await expect(promise).rejects.toThrow()
    })
    // test('Should call SignUpRepository with correct values ', async () => {
    //     const {sut, signUpRepository, hasherSpy} = makeSut();
    //     jest.spyOn(signUpRepository, 'save')
    //     const response = await sut.handle();
    // })
})
