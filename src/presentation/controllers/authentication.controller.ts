import { Controller } from '@/presentation/protocols/controller'
import { badRequest } from '../helpers'
import { Validation } from '../protocols/validation'

export class AuthenticationController implements Controller {
    constructor(
        private readonly validation: Validation
    ) { }

    async handle(data: AuthenticationController.Request): Promise<any> {
        const error = this.validation.validate(data)
        if (error) return badRequest(error)
    }
}

export namespace AuthenticationController {
    export interface Request {
        email: string
        password: string
    }
}
