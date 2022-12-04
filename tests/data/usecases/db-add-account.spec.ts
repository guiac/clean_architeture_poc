
// salvar no banco
// verificar se o email é duplicado
//
import { AddAccount } from '@/domain/usecases'
import { DbAddAccount } from '@/data/usecases'
import { AddAccountRepository, AuthenticationRepository } from '@/data/protocols/db'
import { Hasher } from '@/data/protocols/cryptography'

class AddAccountRepositorySpy implements AddAccountRepository {
    params: any
    result: any = true
    async save(params: any): Promise<AddAccountRepository.Result> {
        this.params = params
        return this.result
    }
}

class AuthenticationRepositorySpy implements AuthenticationRepository {
    params: any
    result: any = true
    async authentication(params: AuthenticationRepository.Params): Promise<AuthenticationRepository.Result> {
        this.params = params
        return this.result
    }
}

export class HasherSpy implements Hasher {
    digest = 'any_digest'
    plaintext: string

    async hash (plaintext: string): Promise<string> {
      this.plaintext = plaintext
      return this.digest
    }
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
    // test('Should call SignUpRepository with correct values ', async () => {
    //     const {sut, signUpRepository, hasherSpy} = makeSut();
    //     jest.spyOn(signUpRepository, 'save')
    //     const response = await sut.handle();
    // })
})
