
import { LoadAccountByTokenRepository } from '@/data/protocols'
export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
    params = null
    result = {
        email: 'email',
        name: 'name',
        lastName: 'lastName',
        identification: 'identification',
        birthDate: 'birthDate',
        tellphone: 'tellphone',
        cellphone: 'cellphone',
        streetAddress: 'streetAddress',
        numberAddress: 'numberAddress',
        districtAddress: 'districtAddress',
        cityAddress: 'cityAddress',
        stateAddress: 'stateAddress',
        accessToken: 'accessToken'
    }

    async load(data: LoadAccountByTokenRepository.Params): Promise<any> {
        this.params = data
        return this.result
    }
}
