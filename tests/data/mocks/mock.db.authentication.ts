import { AuthenticationRepository, LoadAccountByEmailRepository } from '@/data/protocols/db'
import { HashComparer } from '@/data/protocols/cryptography'

export class AuthenticationRepositorySpy implements AuthenticationRepository {
    params: any
    result: any = true
    async authentication(params: AuthenticationRepository.Params): Promise<AuthenticationRepository.Result> {
        this.params = params
        return this.result
    }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
    params: any
    result: any = {
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
    }

    async loadAccountByEmail(params: any): Promise<LoadAccountByEmailRepository.Result> {
        this.params = params
        return this.result
    }
}

export class HashComparerSpy implements HashComparer {
    hash: any
    result: any = true
    async compare(hash: string): Promise<boolean> {
        this.hash = hash
        return this.result
    }
}
