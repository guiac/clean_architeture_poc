import validator from 'validator'
import { EmailValidatorAdapter } from '@/infra/validators'

jest.mock('validator', () => ({
    isEmail(email: string): boolean {
        return true
    }
}))

const makeSut = (): EmailValidatorAdapter => {
    return new EmailValidatorAdapter()
}

describe('EmailValidatorAdapter', () => {
    test('Should call isEmail with correct values', () => {
        const sut = makeSut()
        const isEmailSpy = jest.spyOn(validator, 'isEmail')
        sut.isValid('gui.acassemiro@gmail.com')
        expect(isEmailSpy).toHaveBeenCalledWith('gui.acassemiro@gmail.com')
    })

    test('Should return true if email is valid', () => {
        const sut = makeSut()
        const isValid = sut.isValid('gui.acassemiro@gmail.com')
        expect(isValid).toBeTruthy()
    })
})
