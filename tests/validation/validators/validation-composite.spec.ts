import { faker } from '@faker-js/faker'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { MissingParamError } from '@/presentation/errors'

const field = faker.random.word()
const fieldNameOne = faker.random.word()
const fieldNameTwo = faker.random.word()

const makeSut = (): ValidationComposite => {
  const arrValidations = [
    new RequiredFieldValidation(fieldNameOne),
    new RequiredFieldValidation(fieldNameTwo)
  ]
  const sut = new ValidationComposite(arrValidations)
  return sut
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field })
    expect(error).toEqual(new MissingParamError(fieldNameOne))
  })
})
