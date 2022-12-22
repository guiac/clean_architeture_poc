import { BCryptAdapter } from '@/infra/cryptography'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
    async hash(): Promise<string> {
        return 'hash'
    },

    async compare(): Promise<boolean> {
        return true
    }
}))

const salt = 12
const makeSut = (): BCryptAdapter => {
    return new BCryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
    test('Should call hash with correct values', async () => {
        const sut = makeSut()
        const hashSpy = jest.spyOn(bcrypt, 'hash')
        await sut.hash('any_value')
        expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })
})
