import { faker } from '@faker-js/faker'
import { EmailValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'
import { EmailValidator } from '@/validation/protocols'

const email = faker.internet.email()

interface SutTypes {
  emailValidatorSpy: EmailValidatorSpy
  sut: EmailValidation
}
class EmailValidatorSpy implements EmailValidator {
  param: string
  isEmailValid: boolean = true
  isValid(email: string): boolean {
    this.param = email
    return this.isEmailValid
  }
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new EmailValidation('email', emailValidatorSpy)
  return {
    emailValidatorSpy,
    sut
  }
}

describe('EmailValidation Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.isEmailValid = false
    const error = sut.validate({ email })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorSpy } = makeSut()
    sut.validate({ email })
    expect(emailValidatorSpy.param).toBe(email)
  })
  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ email })
    expect(error).toBeFalsy()
  })
})
