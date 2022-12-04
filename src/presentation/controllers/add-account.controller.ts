import { Controller } from '@/presentation/protocols/controller'
import { EmailInUseError } from '@/presentation/errors'
import { AddAccount, Authentication } from '@/domain/usecases'
import { badRequest, serverError, forbidden, ok } from '../helpers/http-helper'
import { Validation } from '../protocols/validation'
export class AddAccountController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly signUp: AddAccount,
        private readonly authentication: Authentication
    ) { }

    async handle(data: AddAccountController.Request): Promise<any> {
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
            const auth = await this.authentication.handle({ email, password })
            return ok(auth)
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace AddAccountController {
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
