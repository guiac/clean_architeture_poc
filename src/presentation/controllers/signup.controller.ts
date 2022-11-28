import { Controller } from '@/presentation/protocols/controller'
import { badRequest } from '../helpers/http-helper'
import { Validation } from '../protocols/validation'

export class SignupController implements Controller {
    constructor(
        private readonly validation: Validation
    ) { }

    handle(data: SignupController.Request): any {
        const error = this.validation.validate(data)
        if (error) {
            return badRequest(error)
        }
        return data
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
