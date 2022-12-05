import { AddAccountRepository, AuthenticationRepository, CheckAccountByEmailRepository } from '@/data/protocols/db'
import { Hasher } from '@/data/protocols/cryptography'

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
    params: any
    result: any = false
    async checkAccountByEmail(email: string): Promise<AddAccountRepository.Result> {
        this.params = email
        return this.result
    }
}
export class AddAccountRepositorySpy implements AddAccountRepository {
    params: any
    result: any = true
    async save(params: any): Promise<AddAccountRepository.Result> {
        this.params = params
        return this.result
    }
}

export class AuthenticationRepositorySpy implements AuthenticationRepository {
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

    async hash(plaintext: string): Promise<string> {
        this.plaintext = plaintext
        return this.digest
    }
}