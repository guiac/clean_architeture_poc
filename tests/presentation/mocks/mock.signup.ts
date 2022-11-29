import { SignUp } from '@/domain/usecases'

export class SignUpSpy implements SignUp {
    input: any
    async handle(input: any): Promise<void> {
        this.input = input
        return this.input
    }
}
