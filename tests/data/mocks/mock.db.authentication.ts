import { AuthenticationRepository, LoadAccountByEmailRepository } from '@/data/protocols/db'

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
    result: any = true
    async loadAccountByEmail(params: any): Promise<LoadAccountByEmailRepository.Result> {
        this.params = params
        return this.result
    }
}
