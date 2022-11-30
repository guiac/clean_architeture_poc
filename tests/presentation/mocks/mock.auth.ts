import { Authentication } from '@/domain/usecases'

export class AuthSpy implements Authentication {
    input: Authentication.Request
    result = {
        email: 'email',
        name: 'name',
        lastName: 'lastName',
        tellphone: 'tellphone',
        cellphone: 'cellphone',
        streetAddress: 'streetAddress',
        numberAddress: 'numberAddress',
        districtAddress: 'districtAddress',
        cityAddress: 'cityAddress',
        stateAddress: 'stateAddress',
        accessToken: 'accessToken'
    }

    async handle(input: Authentication.Request): Promise<Authentication.Result> {
        this.input = input
        return this.result
    }
}
