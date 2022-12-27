import { Controller } from '@/presentation/protocols/controller'
import { Validation } from '../protocols/validation'

export class UpdateAccountController implements Controller {
    constructor(
        private readonly validation: Validation
    ) { }

    async handle(data: UpdateAccountController.Request): Promise<any> {
        this.validation.validate(data)
    }
}

export namespace UpdateAccountController {
    export interface Request {
        identification: string
        email?: string
        password?: string
        name?: string
        lastName?: string
        birthDate?: Date
        tellphone?: string
        cellphone?: string
        streetAddress?: string
        numberAddress?: string
        districtAddress?: string
        cityAddress?: string
        stateAddress?: string
    }
}
