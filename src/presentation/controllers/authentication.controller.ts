import { Controller } from '@/presentation/protocols/controller'
import { badRequest, serverError } from '@/presentation/helpers'
import { Validation } from '../protocols/validation'
import { Authentication } from '@/domain/usecases'
export class AuthenticationController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly authentication: Authentication
    ) { }

    async handle(data: AuthenticationController.Request): Promise<any> {
        try {
            const error = this.validation.validate(data)
            if (error) return badRequest(error)
            await this.authentication.handle(data)
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace AuthenticationController {
    export interface Request {
        email: string
        password: string
    }
}
