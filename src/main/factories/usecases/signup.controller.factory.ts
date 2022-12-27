import { SignUpController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeSignUpValidation } from '..'
import { makeDbAddAccount, makeDbAuthentication } from '@/main/usecases'
import { makeLogControllerDecorator } from '../decorators'

export const makeSignUpController = (): Controller => {
    const controller = new SignUpController(makeSignUpValidation(), makeDbAddAccount(), makeDbAuthentication())
    return makeLogControllerDecorator(controller)
}
