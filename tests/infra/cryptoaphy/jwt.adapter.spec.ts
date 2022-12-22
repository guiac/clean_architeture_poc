import jwt from 'jsonwebtoken'
import { JwtAdapter } from '@/infra/cryptography'

jest.mock('jsonwebtoken', () => ({
    async sign(): Promise<string> {
        return 'any_token'
    },

    async verify(): Promise<string> {
        return 'any_value'
    }
}))
const secret = 'any_secret'
const makeSut = (): JwtAdapter => { return new JwtAdapter(secret) }

describe('Jwt Adapter', () => {
    describe('Jwt Adapter', () => {
        test('Should call sign with correct values', async () => {
            const sut = makeSut()
            const signSpySpy = jest.spyOn(jwt, 'sign')
            await sut.encrypt('any_id')
            expect(signSpySpy).toHaveBeenCalledWith({ id: 'any_id' }, 'any_secret')
        })

        test('Should return a token on sign success', async () => {
            const sut = makeSut()
            const response = await sut.encrypt('any_id')
            expect(response).toBe('any_token')
        })
    })
})
