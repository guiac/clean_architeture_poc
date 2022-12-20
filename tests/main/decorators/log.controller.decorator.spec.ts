import { Controller, HttpResponse } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'

import { faker } from '@faker-js/faker'
import { ok } from '@/presentation/helpers'

const field = faker.random.word()
const mockRequest = (): any => ({
    field
})

class ControllerSpy implements Controller {
    input = null
    httpResponse = ok(faker.datatype.uuid())
    async handle(request: any): Promise<HttpResponse> {
        this.input = request
        return this.httpResponse
    }
}

describe('LogControllerDecorator', () => {
    test('Should call Controller with correct values', async () => {
        const controllerSpy = new ControllerSpy()
        const sut = new LogControllerDecorator(controllerSpy)
        const request = mockRequest()
        await sut.handle(request)
        expect(controllerSpy.input).toEqual(request)
    })
})
