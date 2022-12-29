import { adaptRoute } from '@/main/adapters'
import { makeSignUpController, makeUpdateAccountControler } from '@/main/factories'

import { Router } from 'express'

export default (router: Router): void => {
    router.post('/signup', adaptRoute(makeSignUpController()))
    router.put('/account/update/:identification', adaptRoute(makeUpdateAccountControler()))
}
