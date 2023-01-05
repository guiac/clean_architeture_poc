import { LoadAccountByTokenRepository } from '@/data/protocols/db'
import { Decrypter } from '@/data/protocols/cryptography'

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
    params: any
    result: any = true

    async load(params: any): Promise<LoadAccountByTokenRepository.Result> {
        this.params = params
        return this.result
    }
}

export class DecrypterSpy implements Decrypter {
    param: string
    result: string = 'any_id'
    async decrypt(plaintext: string): Promise<string> {
        this.param = plaintext
        return this.result
    }
}
