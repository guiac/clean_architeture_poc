import { Controller } from '@/presentation/protocols/controller'
import { EmailInUseError } from '@/presentation/errors'
import { SignUp, Authentication } from '@/domain/usecases'
import { badRequest, serverError, forbidden } from '../helpers/http-helper'
import { Validation } from '../protocols/validation'

export class SignupController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly signUp: SignUp,
        private readonly authentication: Authentication
    ) { }

    async handle(data: SignupController.Request): Promise<any> {
        try {
            const error = this.validation.validate(data)
            if (error) {
                return badRequest(error)
            }
            const isValid = await this.signUp.handle(data)
            if (!isValid) {
                return forbidden(new EmailInUseError())
            }
            const { email, password } = data
            return await this.authentication.handle({ email, password })
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace SignupController {
    export interface Request {
        email: string
        password: string
        name: string
        lastName: string
        birthDate: Date
        tellphone: string
        cellphone: string
        streetAddress: string
        numberAddress: string
        districtAddress: string
        cityAddress: string
        stateAddress: string
    }
}
