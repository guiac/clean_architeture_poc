import { SignUpModel } from '../models'

export interface SignUp {
    handle: (data: SignUpModel) => Promise<void>
}
