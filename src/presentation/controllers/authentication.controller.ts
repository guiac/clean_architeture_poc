import { Controller } from '@/presentation/protocols/controller'
import { Validation } from '../protocols/validation'

export class AuthenticationController implements Controller {
    constructor(
        private readonly validation: Validation
    ) { }

    async handle(data: AuthenticationController.Request): Promise<any> {
        this.validation.validate(data)
    }
}

export namespace AuthenticationController {
    export interface Request {
        email: string
        password: string
    }
}
