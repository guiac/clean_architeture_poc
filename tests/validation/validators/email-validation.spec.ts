import { faker } from '@faker-js/faker'
import { EmailValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'
import { EmailValidator } from '@/validation/protocols'

const field = faker.random.word()
const fiedlInput = faker.random.word()
const email = faker.internet.email()

interface SutTypes {
  emailValidatorSpy: EmailValidatorSpy
  sut: EmailValidation
}
class EmailValidatorSpy implements EmailValidator {
  param: string
  isEmailValid: boolean = true
  isValid(param: string): boolean {
    this.param = param
    return this.isEmailValid
  }
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new EmailValidation(field, emailValidatorSpy)
  return {
    emailValidatorSpy,
    sut
  }
}

describe('EmailValidation Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.isEmailValid = false
    const error = sut.validate({ [fiedlInput]: email })
    expect(error).toEqual(new InvalidParamError(field))
  })
})
