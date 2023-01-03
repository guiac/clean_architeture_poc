
import { LoadAccountByTokenRepository } from '@/data/protocols'

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
    params = null
    result = {
        email: 'email',
        name: 'name',
        lastName: 'lastName',
        identification: 'identification',
        birthDate: new Date(),
        tellphone: 'tellphone',
        cellphone: 'cellphone',
        streetAddress: 'streetAddress',
        numberAddress: 'numberAddress',
        districtAddress: 'districtAddress',
        cityAddress: 'cityAddress',
        stateAddress: 'stateAddress',
        accessToken: 'accessToken'
    }

    async load(accessToken: string, role?: string): Promise<any> {
        this.params = { accessToken, role }
        return this.result
    }
}
