import { Controller } from '@/presentation/protocols/controller'
import { SignUp } from '@/domain/usecases'
import { badRequest, serverError } from '../helpers/http-helper'
import { Validation } from '../protocols/validation'

export class SignupController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly signUp: SignUp
    ) { }

    async handle(data: SignupController.Request): Promise<any> {
        try {
            const error = this.validation.validate(data)
            if (error) {
                return badRequest(error)
            }
            await this.signUp.handle(data)
            return data
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
