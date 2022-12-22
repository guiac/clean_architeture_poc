import jwt from 'jsonwebtoken'
import { JwtAdapter } from '@/infra/cryptography'

jest.mock('jsonwebtoken', () => ({
    async sign(): Promise<string> {
        return 'any_value'
    },

    async verify(): Promise<string> {
        return 'any_value'
    }
}))
const secret = 'any_secret'
const makeSut = (): JwtAdapter => { return new JwtAdapter(secret) }

describe('encrypt()', () => {
    test('Should call sign with correct values', async () => {
        const sut = makeSut()
        const signSpySpy = jest.spyOn(jwt, 'sign')
        await sut.encrypt('any_id')
        expect(signSpySpy).toHaveBeenCalledWith({ id: 'any_id' }, 'any_secret')
    })
})
