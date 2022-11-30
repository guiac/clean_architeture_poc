import { SignUp } from '@/domain/usecases'

export class SignUpSpy implements SignUp {
    input: any
    async handle(input: SignUp.Request): Promise<SignUp.Result> {
        this.input = input
        return this.input
    }
}
